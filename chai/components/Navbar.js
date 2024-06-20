import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from "../auth"

const Navbar = async () => {
  const session = await auth()
  if (session){
    return(
      <>
        <div>
          {session.user.name}
        </div>
      </>
    )
  }
  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 h-16'>
        <div className="logo font-bold text-lg flex justify-center items-center">
          <Image unoptimized={true} width={44} height={44} src="/logo.gif" alt="" />
          <span>GetMeaChai!</span>
        </div>
      {/* <ul className="flex justify-between gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>SignUp</li>
        <li>Login</li>
      </ul> */}

      <div>
        <Link href={"/login"}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
