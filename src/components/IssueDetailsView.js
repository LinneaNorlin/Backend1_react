import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/sv'
import axios from 'axios'
import CommentForm from './CommentForm'
import Status from './Status'
import Comment from './Comment'


const IssueDetailsView = () => {
  const { id } = useParams()
  const [issue, setIssue] = useState(null)

  useEffect(() => {
    const fetchIssue = async () => {
        const res = await axios.get('https://localhost:7099/api/issues/' + id)
        setIssue(res.data)
        console.log(res.data)
    }
    fetchIssue()
  }, [id])

  return (
    <div className='mt-3 px-3 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto'>
      <h4 className='subheadline'>Case Details</h4>

      <div className='card-details'>
      { issue && 
        <div>
          <div className='col-12 mt-2'>
            <h2>{issue.subject}</h2>

            <div className='mt-3 row'>
              <div className='col-6'>
                <p className='mt-2'>Case Created At</p>
                <small>{moment(issue.created).format('DD MMMM YYYY, h:mm')}</small>
              </div>
              <div className='col-6 text-end pe-4'>
                <p className='mt-2'>Current Case Status</p>
                <small className='text-status'>{issue.status.status}</small>
              </div>
            </div>

            <div className='mt-3 row'>
              <div className='col-6'>
                <p className='mt-2'>By User</p>
                <p className='m-0'>{issue.user.firstName} {issue.user.lastName}</p>
                <small>{issue.user.email}</small>
              </div>
              <div className='col-6 text-end'>
                <Status />
              </div>
            </div>
          </div>

          <div>
            <p className='mt-2'>Issue:</p>
            <p className='mt-2 mb-5'>{issue.description}</p>
          </div>

          < CommentForm issue={issue} />

          <div className='bg-card bg-gray mt-5'>
            <div className='mt-3 col-12 col-md-11'>
              <p className="text-label">List Of All Comments</p>
                { !issue.comments.length && <p className='subheadline text-light'>No comments to show!</p>}
                { issue.comments
                  .sort((a, b) => b.created > a.created ? 1 : -1)
                  .map(comment => 
                    <Comment key={comment.id} comment={comment} />) 
                }
            </div>
          </div>

          <div className='text-center mt-4 mb-2'>
            <i className="fa-solid fa-angles-up text-link" onClick={() => window.scrollTo(0, 0)}></i>
          </div>
        
        </div>
      }
      </div>

      <div className='text-center text-link mt-4 mb-4'>
        <Link to="/" className='text-link'><i className="fa-solid fa-backward"></i> Go back</Link> 
      </div>

    </div>
  )
}

export default IssueDetailsView