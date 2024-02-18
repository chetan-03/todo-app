"use client"
import Link from 'next/link'
import React from 'react'
import Formikform from '../../components/form'
type Props = {}

function page({ }: Props) {
    return (
        <div className='grid place-items-center gap-3'>
            <h1>Sign Up Yourself</h1>
            <Formikform />
            <p>already have an account ? {" "}

                {/* <a href="/login" > */}
                <Link
                    href={'/login'}
                >
                    Login
                </Link>
                {/* </a> */}
            </p>
        </div>
    )
}

export default page