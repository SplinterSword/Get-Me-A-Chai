"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { fetchuser, updateProfile } from '@/actions/useractions'

const Dashboard = () => {
  const {data:session, update} = useSession();
  const [form, setForm] = useState({})
  if (!session) {
    const router = useRouter()
    router.push("/login")
  }

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    console.log(session.user.name)
    let u = await fetchuser(session.user.name)
    setForm(u)
  }

  const handleSubmit = async (e) => {
    update()
    e = updateProfile(e,session.data.user.name)
    alert("Profile Update")
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  }
  return (
    <div>
      <h1 className='text-center font-bold text-4xl my-14'>Welcome to Your Dashboard</h1>
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="profile_pic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
          <input type="text" name="profile_pic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="cover_pic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
          <input type="text" name="cover_pic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="razorpay_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay ID</label>
          <input type="text" name="razorpay_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label for="razorpay_secret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay Secret</label>
          <input type="text" name="razorpay_secret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
