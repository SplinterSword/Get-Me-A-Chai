"use client";
import React, { useEffect } from "react";
import Script from "next/script";
import Image from 'next/image'
import { fetchpayments, initiate, fetchuser } from "@/actions/useractions";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const Payment = ({username}) => {
    const [paymentform, setPaymentform] = useState({})
    const session = useSession()
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect (() => {
      getData()
    },[])

    useEffect (() => {
      if(searchParams.get("paymentdone") == 'true'){
        toast('Payment Recieved', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      router.push(`/${username}`)
    },[])
    
    const getData = async (params) => {
      let u = await fetchuser(username)
      setCurrentuser(u)
      let dbpayments = await fetchpayments(username)
      setPayments(dbpayments)
    }
    const handleChange = (e) => {
        setPaymentform({...paymentform,[e.target.name]: e.target.value})
    }

    const pay = async (amount) => {
        // Get the order ID
        let a = await initiate(amount, currentuser.username, paymentform)
        let orderID = a.id
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get me a Chai", //your business name
            "description": "Test Transaction",
            "image": currentuser.profilepic,
            "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className='cover w-full bg-red-50 relative'>
        <img className="object-cover w-full h-[350px]" src={currentuser.coverpic} alt="" />
        <div className='absolute -bottom-14 right-[47%] border-2 overflow-hidden border-white rounded-full'>
          <Image className='rounded-full' width={100} height={100} src={currentuser.profilepic} alt="" />
        </div>
      </div>
      <div className="info flex flex-col gap-2 justify-center items-center my-20 ">
        <div className='font-bolde text-lg'>
          @{currentuser.username}
        </div>
        <div className='text-slate-400'>
          Created Animated art for VTT's
        </div>
        <div className='text-slate-400'>
          9,716 members . 82 post . ₹15,450/release
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg p-10">
            {/* Leaderboard */}
            <h2 className='text-2xl font-bold my-5'>Supporters</h2>
            <ul className='mx-5 font-lg'>
              {payments.length == 0 && <li>No Payments Yet</li>}
              {payments.map((p,i) => {
                return <li key={p.oid} className='my-4 flex gap-2 items-center'>
                <Image unoptimized="true" width={33} height={33} src="/avatar.gif" alt="" />
                <div>
                  {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"
                </div>
              </li>
              })}
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className='text-2xl font-bold my-5'>Make A Payment</h2>
            <div className="flex flex-col gap-2">
              <input onChange={handleChange} name="name" value={paymentform.name} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Name'/>
              <input onChange={handleChange} name="message" value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Message'/>
              <input onChange={handleChange} name="amount" value={paymentform.amount} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Amount'/>
              <button onClick={async ()=>{pay(Number.parseInt(paymentform.amount*100))}} className='text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-500' disabled={paymentform.name?.length<3 || paymentform.message?.length < 4}>Pay</button>
            </div>
            {/* Or Choose from these Amounts */}
            <div className="flex gap-2 mt-5">
              <button className='bg-slate-800 p-3 rounded-lg' onClick={async ()=>{await pay(1000)}} disabled={paymentform.name?.length<3 || paymentform.message?.length < 4}>Pay ₹10</button>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={async ()=>{await pay(2000)}} disabled={paymentform.name?.length<3 || paymentform.message?.length < 4}>Pay ₹20</button>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={async ()=>{await pay(3000)}} disabled={paymentform.name?.length<3 || paymentform.message?.length < 4}>Pay ₹30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
