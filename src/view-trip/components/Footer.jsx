import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-100 text-center py-4 mt-10 border-t'>
      <p className='text-gray-500 text-sm'>
        © {new Date().getFullYear()} Travel Mate Created By Gunjan Saini. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer