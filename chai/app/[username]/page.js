import React from 'react'
import Payment from '@/components/Payment'


const Username = ({params}) => {
  return (
    <>
      <Payment username={params.username}/>
    </>
  )
}

export default Username
