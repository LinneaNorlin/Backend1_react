import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/sv'

const Issue = ({ issue }) => {

  return (
    
    <Link to={`/issues/${issue.id}`}  className="d-flex justify-content-between align-items-center bg-card">
      <div className='me-2'>
        <p>One case in list</p>
        <h6 className='text-dark'>{issue.subject}</h6>
        <h6 className='text-danger'>{issue.status}</h6>
        <small className='text-dark'>{moment(issue.created).format('DD MMMM YYYY, h:mm a')}</small>
      </div>
    </Link> 
    
  )
}

export default Issue