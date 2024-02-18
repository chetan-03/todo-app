'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import * as yup from 'yup'
import YupPassword from 'yup-password'
import createUser from '../server/actions/create-user';

YupPassword(yup)

type Props = {}

interface Values {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
}

const handleCreateUser = async (values: Values) => {
    console.log("in handle create user function", values)
    try {

        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(values)
        })
        if (!res.ok) throw new Error('Server response not OK')
        return await res.json()
    } catch (e) {
        console.log("errors while fetch post request : ", e)
    }

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
            createUser(formik.values)
            console.log("On submit: ", formik)
            setMessage('Form submitted')
            setSubmitted(true)
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email('Must be a valid email')
                .required('Email is required'),
            password: yup
                .string()
                .required("password is required")
                .min(8, 'password is too short -- should be 8 chars minimum')
                .minLowercase(1, "password must contain atleast 1 lowercase letter")
                .minUppercase(1, "password must contain atleast 1 uppercase letter")
                .minNumbers(1, "password must contain atleast 1 number")
                .minSymbols(1, "password must contain atleast 1 special character"),
            confirm_password: yup
                .string()
                .required("confirm password is required")
                .oneOf([yup.ref('password'), null], 'Password must match'),
            firstname: yup.string().required('First name is required').max(30),
            lastname: yup.string().required('Last name is required').max(30),

        })
    })

    return (


        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
            <div className="flex gap-2">

                <label htmlFor="firstname">First Name : </label>
                <input type="text" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} id='firstname' name='firstname' placeholder='enter your first name' />
                {formik.errors.firstname && (
                    <div>{formik.errors.firstname} </div>
                )}
            </div>
            <div className="flex">

                <label htmlFor="lastname">Last Name : </label>
                <input type="text" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} id='lastname' name='lastname' placeholder='enter your last name' />
                {formik.errors.lastname && (
                    <div>{formik.errors.lastname} </div>
                )}
            </div>
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
                <label htmlFor="confirm_password">Confirm Password : </label>
                <input type="password" value={formik.values.confirm_password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='confirm_password' name='confirm_password' placeholder='confirm your password' />
                {formik.errors.confirm_password && (
                    <div>{formik.errors.confirm_password} </div>
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