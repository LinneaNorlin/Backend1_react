import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const IssueList = () => {

    const [issues, setIssues] = useState([])

    useEffect(() => {
        const fetchIssues = async () => {
            const res = await fetch('https://localhost:7099/api/issues')
            setIssues(await res.json())
        }
        fetchIssues()
    }, [])

    return (
        <div className='mt-3 px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
            <h4 className='subheadline'>Case List</h4>

            <div className="mt-5 mb-3">
                <p className="text-label">List Of All Cases</p>
                <div className="">
                    {issues
                    .sort((a, b) => b.created > a.created ? 1 : -1)
                    .map(issue => 
                    <div key={issue.id} value={issue.id} className='bg-card mb-2'>
                        <h3>{issue.subject}</h3>
                        <small>{moment(issue.created).format('DD MMMM YYYY, h:mm a')}</small>
                        <p className='text-status'>{issue.status.status}</p>
                        <p>{issue.user.firstName} {issue.user.lastName}</p>
                        <Link 
                        to={`/details/${issue.id}`}  
                        className="text-center text-link mt-4 mb-4">
                            <p><i className="me-2 fa-regular fa-pen-to-square"></i>Edit case</p>
                        </Link>
                    </div>)}
                </div>
                <div className='text-center text-link mt-4 mb-4'>
                    <p className='text-link' onClick={() => window.scrollTo(0, 0)}><i className="fa-solid fa-plus"></i> Add New Case?</p> 
                </div>
            </div>

        </div>
    )
}

export default IssueList