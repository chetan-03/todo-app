import React from 'react'
import Navbar from '../components/navbar'
import toDoIcon from '../public/Microsoft_To-Do_icon.svg'
function Header() {
    return (
        <Navbar
            logo={toDoIcon}
            links={[
                { name: "Home", href: "/", current: true },
                { name: "SignIn", href: "/login", current: false },
                { name: "SignUp", href: "/register", current: false }
            ]}
        />
    )
}

export default Header