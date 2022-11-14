import React from 'react'
import { useEffect, useState } from 'react'
import IssueList from './IssueList'
import UserForm from './UserForm'

const IssueForm = () => {
    const [users, setUsers] = useState([])
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://localhost:7099/api/users')
            setUsers(await res.json())
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (userId !== 0) {
            const json = JSON.stringify({ subject, description, userId })
            const res = await fetch('https://localhost:7099/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            console.log(await res.json())
            setSubject('')
            setDescription('')
            setUserId(0)
        }
    }

    return (
        <div className='mt-3'>
            <h4 className='subheadline'>Create New Case</h4>

            <p className='text-center mt-4'>Not registered yet?</p>
                <div className='text-center'>
                <p className='text-link mb-4' onClick={() => window.scrollTo(0, document.body.scrollHeight)}><i className="fa-solid fa-plus"></i> Go To Register New User</p> 
            </div>

            <form onSubmit={handleSubmit} className="px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <select className="form-select" onChange={(e) => setUserId(e.target.value)} required>
                        <option value={0}>-- Select User --</option>
                        {users.map(user => <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Case Subject</label>
                    <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Case Description</label>
                    <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn mt-2">Save New Case</button>
            </form>

            <div className='border-top border-light mt-5'>
                <IssueList />
            </div>

            <div className='border-top border-light mt-5'>
                <UserForm />
            </div>
        </div>
    )
}

export default IssueForm