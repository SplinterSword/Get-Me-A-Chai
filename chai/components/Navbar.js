"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser } from '@/actions/useractions'

const Navbar =  () => {
  const session = useSession();
  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row'>
        <div className="logo font-bold text-lg flex justify-center items-center">
          <Image unoptimized={true} width={44} height={44} src="/logo.gif" alt="" />
          <Link href="/"><span>GetMeaChai!</span></Link>
        </div>

      <div className='flex'>
        {session.data && <div className='flex'>
          <button type="button" onClick={() => signOut()} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Sign Out</button>
          <Link href={"/dashboard"}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Dashboard</button>
          </Link>
          <Link href={`/${session.data.user.name.replace(" ","-")}`}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Your Page</button>
          </Link>
          </div>
          }
        {!session.data && <Link href={"/login"}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
        </Link>}
        
      </div>
    </nav>
  )
}

export default Navbar
