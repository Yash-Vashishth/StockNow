import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/public/assets/icons/logo.svg'
import NavItems from './NavItems'
import UserDropdown from './UserDropdown'
import { searchStocks } from '@/lib/actions/finnhub.actions'
import { auth } from '@/lib/better-auth/auth'
import { headers } from 'next/headers'

const Header = async () => {
  const initialStocks = await searchStocks();
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user ? { id: session.user.id, name: session.user.name, email: session.user.email } : null;



  return (
    <header className='sticky top-0 header'>
      <div className='container header-wrapper'>
        <Link href='/'>
          <Image src={logo} alt='Signalist logo' width={140} height={32} className='h-8 auto cursor-pointer' />
        </Link>
        <nav className='hidden sm:block'>
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  )
}

export default Header