"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import mongoose from "mongoose"

export const initiate = async (amount, to_username, paymentform) => {

    const client = await mongoose.connect(`mongodb://localhost:27017/chai`)

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: to_username})
    const secret = user.razorpaysecret
    const id = user.razorpayid

    var instance = new Razorpay({ key_id: id, key_secret:  secret})
    

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment
    await Payment.create({oid: x.id, amount: amount/100, to_user: to_username.replace(" ","-"), name: paymentform.name, message: paymentform.message})
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
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).limit(10).lean()
    return p;
}

export const updateProfile = async (data,oldusername) => {
    const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
    let mdata = Object.fromEntries(data)
    // If the username is being updated, check if username is available
    if (oldusername != mdata.username) {
        let u = await User.findOne({username: mdata.username})
        console.log(u)
        if (u) {
            return {error: "username already exists"}
        }
    }
    let a = await User.updateOne({useremail: mdata.useremail}, mdata)
}