"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import mongoose from "mongoose"

export const initiate = async (amount, to_username, paymentform) => {

    const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret:  process.env.KEY_SECRET})
    

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment
    await Payment.create({oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message})
    return x
}

export const fetchuser = async (username) => {
    const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
    let u = await User.findOne({username: username.replace("-"," ")})
    let user = u.toObject({flattenObjectIds: true})
    return user;
}

export const fetchpayments = async (username) => {
    const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
    // find all payments sorted by decreasing order of amount and flatten objects ids
    let p = await Payment.find({to_user: username}).sort({amount: -1}).lean()
    return p;
}

export const updateProfile = async (data,oldusername) => {
    const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
    let mdata = Object.fromEntries(data)
    // If the username is being updated, check if username is available
    if (oldusername != mdata.username) {
        let u = await User.findOne({username: oldusername})
        if (u) {
            return {error: "username already exists"}
        }
    }
    await User.updateOne({email: mdata.email()}, mdata)
}