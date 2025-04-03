import BookForm from '@/components/admin/forms/BookForm'
import { Button } from '@/components/ui/button'
import { bookSchema } from '@/lib/validations'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <Button asChild className='back-btn'>
                <Link href={'/admin/books'}>Go back</Link>
            </Button>
            <section className='w-full max-w-2xl'>
                <BookForm
                    type="create"
                />
            </section>
        </>
    )
}

export default page