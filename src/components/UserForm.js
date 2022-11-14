import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const UserForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const json = JSON.stringify({firstName, lastName, email, phoneNumber})

        const res = await fetch('https://localhost:7099/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        console.log(await res.json())
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
    }

    return (
        <div className='mt-3'>
            <h4 className='subheadline'>Register New User</h4>

            <form onSubmit={handleSubmit} className='px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                
                <button type="submit" className="btn mt-2">Save New User</button>

                <p className='text-center mt-4'>Already registered?</p>
                <div className='text-center'>
                    <p className='text-link mb-4' onClick={() => window.scrollTo(0, 0)}><i className="fa-solid fa-plus"></i> Go To Create New Case</p> 
                </div>

            </form>
        </div>
    )
}

export default UserForm