import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center h-16 px-5'>
      <img src="/logo.svg" style={{ width: '110px', height: 'auto' }} alt="Logo" />

      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
