"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const {data:session, update} = useSession();
  const [form, setForm] = useState({})
  if (!session) {
    const router = useRouter()
    router.push("/login")
  }

  useEffect(() => {
    document.title = "Dashboard - Get Me a Chai"
    getData()
  }, [])
  
  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setForm(u)
  }

  const handleSubmit = async (e) => {
    console.log(e)
    e = updateProfile(e,session.user.name)
    toast('Profile Updated', {
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

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  }
  return (
    <div>
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
      <h1 className='text-center font-bold text-4xl my-14'>Welcome to Your Dashboard</h1>
      <form className="w-1/2 mx-auto" action={handleSubmit}>
        <div className="mb-5">
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" value={form.name?form.name:""} onChange={handleChange} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" disabled value={form.useremail?form.useremail:""} onChange={handleChange} name="useremail" className="bg-gray-50 border disabled:bg-slate-800 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input type="text" disabled value={form.username?form.username:""} onChange={handleChange} name="username" className="bg-gray-50 border disabled:bg-slate-800 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
          <input type="text" value={form.profilepic?form.profilepic:""} onChange={handleChange} name="profilepic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
          <input type="text" value={form.coverpic?form.coverpic:""} onChange={handleChange} name="coverpic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay ID</label>
          <input type="text" value={form.razorpayid?form.razorpayid:""} onChange={handleChange} name="razorpayid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay Secret</label>
          <input type="text" value={form.razorpaysecret?form.razorpaysecret:""} onChange={handleChange} name="razorpaysecret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className='mb-5'></div>
        <div className='mb-5'>
          <button type="submit" className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
        </div>
      </form>
    </div>
  )
}

export default Dashboard