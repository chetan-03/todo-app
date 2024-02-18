'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import * as yup from 'yup'
import YupPassword from 'yup-password'
import getUser from '../server/actions/get-user';

YupPassword(yup)

type Props = {}

interface Values {
    email: string;
    password: string;
}

const Formikform: NextPage = (props: Props) => {
    // this message state is used to show message if validation is successful
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
            confirm_password: "",
            firstname: "",
            lastname: ""
        },
        onSubmit: () => {
            // handleCreateUser(formik.values)
            getUser(formik.values)
            console.log("On submit: ", formik)
            setMessage('Form submitted')
            setSubmitted(true)
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required('Email is required'),
            password: yup
                .string()
                .required("password is required")
        })
    })

    return (

        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>

            <div className="flex">

                <label htmlFor="email">Email : </label>
                <input type="text" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name='email' placeholder='enter your email' />
                {formik.errors.email && (
                    <div>{formik.errors.email} </div>
                )}
            </div>
            <div className="flex">

                <label htmlFor="password">Password : </label>
                <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name='password' placeholder='enter your password' />
                {formik.errors.password && (
                    <div>{formik.errors.password} </div>
                )}
            </div>
            <div className="flex">

                <button type="submit" className='block px-2 rounded-full bg-cyan-900 text-white'>Submit </button>
            </div>

            <div hidden={!submitted} className=''>{message}</div>
        </form>

    )
}

export default Formikform