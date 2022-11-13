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
            <h3>{issue.subject}</h3>

            <div className='mt-3 d-flex justify-content-between border row'>
              <div className='col-6 border border-primary'>
                <small>{moment(issue.created).format('DD MMMM YYYY, h:mm a')}</small>
                <p className='text-status'>{issue.status.status}</p>
              </div>
              <div className='col-6 border border-danger justify-content-end'>
                <Status />
              </div>
            </div>

            <div className='col-6 border border-danger justify-content-end'>
              <p className='m-0'>{issue.user.firstName} {issue.user.lastName}</p>
              <small>{issue.user.email}</small>
            </div>

          {/* this div ends the row of card, 12 cols */}
          </div>

          <div>
            <p className='mt-2'>{issue.description}</p>
          </div>

          < CommentForm issue={issue} />

          <div className='bg-card bg-success text-light'>
            <p className='mt-2'>
            Here comes Case Comments: 
              { issue.comments
                .map(comment => 
                  <Comment key={comment.id} comment={comment} />) 
              }
            </p>
          </div>

          <p>user id? {issue.user.id}</p>
        
        </div>
      // here are the } end of issue &&: (after this I have no issue)
      }

      {/* this is the /div for the end of card: */}
      </div>

      <div className='text-center text-link mt-4 mb-4'>
        <Link to="/" className='text-link'><i className="fa-solid fa-backward"></i> Go back</Link> 
      </div>



    </div>
  )
}

export default IssueDetailsView