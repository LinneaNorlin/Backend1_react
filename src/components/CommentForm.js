import React, { useState } from 'react'


const CommentForm = ({issue}) => {

    const [comment, setComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const issueId = issue.id
        const userId = issue.user.id
        
        if (issueId !== 0) {
            const json = JSON.stringify({ comment, issueId, userId }) 
            // console.log(json)
            const res = await fetch('https://localhost:7099/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            console.log(await res.json())
            setComment('')
        }
    }

    return (
        <div className='bg-card bg-dark text-light mt-2 mb-2'>
            {/* <h5>Comment Case</h5> */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-light">Comment Case</label>
                    <textarea type="text" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn">Save New Comment</button>
            </form>
        </div>
    )
}

export default CommentForm