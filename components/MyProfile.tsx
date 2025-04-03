import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getInitials } from '@/lib/utils'
import { auth } from '@/auth'

const MyProfile = async () => {
    const session = await auth();
    return (
        <li>
            <Link href={'/my-profile'}>
                <Avatar>
                    <AvatarFallback className='bg-amber-100'>
                        {getInitials(session?.user?.name || "IN")}
                    </AvatarFallback>
                </Avatar>
            </Link>
        </li>
    )
}

export default MyProfile