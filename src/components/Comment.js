import React from 'react'
import moment from 'moment'
import 'moment/locale/sv'

const Comment = ({comment}) => {

  return (
      <div className="mt-5 mb-4">
        <small>{moment(comment.created).format('DD MMMM YYYY, h:mm a')}</small>
        <h6 className='mt-2'>{comment.comment}</h6>
      </div>
  )
}

export default Comment