import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import MyProfile from './MyProfile'

const Header = () => {
    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href={'/'}>
                <Image src={'/icons/logo.svg'} alt='logo' width={40} height={40} />
            </Link>
            <ul className='flex flex-row items-center gap-8'>
                {/* <li>
                    <Link href={'/library'} className={cn('text-base cursor-pointer capitalize', pathname === '/library' ? 'text-light-200' : 'text-light-100')}>
                        Library
                    </Link>
                </li> */}
                <MyProfile />
                <li>
                    <Button
                        // className='mb-10'
                        onClick={async () => {
                            "use server"
                            await signOut();
                        }}
                    >
                        Logout
                    </Button>
                </li>
            </ul>
        </header>
    )
}

export default Header