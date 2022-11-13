import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Status = () => {
    const { id } = useParams()
    const [statuses, setStatuses] = useState([])
    const [statusId, setStatusId] = useState(0)

    // For select status field
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://localhost:7099/api/statuses')
            setStatuses(await res.json())
        }
        fetchData()
    }, [])

    const handleUpdateSubmit = async (e) => {
        e.preventDefault() 
        
        if (statusId !== 0) {
            const json = JSON.stringify({ statusId }) //the value from field 
            const res = await fetch(`https://localhost:7099/api/issues/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            console.log(await res.json())
            setStatusId(0)
        }
    }

  return (
    <div>
        <form onSubmit={handleUpdateSubmit}>
        <div className="mb-3">
            <label className="form-label">Ändra Status</label>
            <select className="form-select" onChange={(e) => setStatusId(e.target.value)} required>
                <option value={0}>-- Ange en status --</option>
                {statuses.map(status => <option key={status.id} value={status.id}>{status.id} - {status.status}</option>)}
            </select>
            <button type="submit" className="btn btn-secondary">Spara ändring</button>
        </div>    
        </form>
    </div>
  )
}

export default Status