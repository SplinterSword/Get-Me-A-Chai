"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
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