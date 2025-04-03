"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { borrowBook } from '@/lib/actions/book'
interface Props {
    bookId: string,
    userId: string,
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    }
}
const BorrowBook = ({ bookId, userId, borrowingEligibility }: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () => {
        if (!borrowingEligibility.isEligible) {
            toast({
                title: "Error",
                description: borrowingEligibility.message,
                variant: "destructive",
            })
            return;
        }
        setBorrowing(true);
        try {
            const result = await borrowBook({ bookId, userId });
            if (result.success) {
                toast({
                    title: "Success",
                    description: "Book borrowed successfully",
                })
            } else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "An error occurred while borrowing the book",
                variant: "destructive"
            })
        } finally {
            setBorrowing(false);
        }
    }
    return (
        <Button className='book-overview_btn' onClick={handleBorrow} disabled={borrowing}>
            <Image src="/icons/book.svg" alt="download" width={20} height={20} />
            <p className='font-bebas-neue text-xl text-dark-100'>
                {
                    borrowing ? "Borrowing..." : "Borrow Book"
                }
            </p>
        </Button>
    )
}

export default BorrowBook