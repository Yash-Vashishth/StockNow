import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/public/assets/icons/logo.svg'
import NavItems from './NavItems'
import UserDropdown from './UserDropdown'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
      <div className='container header-wrapper'>
        <Link href='/'>
          <Image src={logo} alt='Signalist logo' width={140} height={32} className='h-8 auto cursor-pointer' />
        </Link>
        <nav className='hidden sm:block'>
          <NavItems />
        </nav>
        <UserDropdown />
      </div>
    </header>
  )
}

export default Header