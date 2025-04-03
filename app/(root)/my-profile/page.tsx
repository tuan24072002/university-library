import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { desc } from 'drizzle-orm';
import React from 'react'

const page = async () => {
    const latestBooks = await db
        .select()
        .from(books)
        .limit(10)
        .orderBy(desc(books.createdAt));
    return (
        <>
            <form
                action={async () => {
                    "use server";

                    await signOut();
                }}
                className="mb-10"
            >
                <Button>Logout</Button>
            </form>
            <BookList
                title='Borrowed Books'
                books={latestBooks}
            />
        </>
    )
}

export default page