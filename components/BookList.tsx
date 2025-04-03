"use client"
import React from 'react'
import BookCard from './BookCard'
type Props = {
    title: string
    books: Book[]
    containerClassName?: string
}
const BookList = ({ title, books, containerClassName, }: Props) => {
    return (
        books.length > 2 &&
        <section className={containerClassName}>
            <h2 className='font-bebas-neue text-4xl text-light-100'>
                {title}
            </h2>
            <ul className='book-list'>
                {books.map((book) => {
                    return (
                        <BookCard
                            key={book.title}
                            {...book}
                            isLoanedBook={false}
                        />
                    )
                })}
            </ul>
        </section>
    )
}

export default BookList