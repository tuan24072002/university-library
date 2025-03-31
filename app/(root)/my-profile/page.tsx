import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    return (
        <>
            <Button
                className='mb-10'
                onClick={async () => {
                    "use server"
                    await signOut();
                    redirect("/login");
                }}
            >
                Logout
            </Button>
            <BookList
                title='Borrowed Books'
                books={sampleBooks}
            />
        </>
    )
}

export default page