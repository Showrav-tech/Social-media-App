import React, { useState, useEffect } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecentMessages = () => {
  const [messages, setMessages] = useState([])

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData)
  }

  useEffect(() => {
    fetchRecentMessages()
  }, [])

  return (
    <div className='bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800'>
      <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>
      <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
        {messages.map((message, index) => (
          <Link
            key={index}
            to={`/messages/${message.id}`}
            className='flex flex-col gap-1 py-2 px-1 hover:bg-slate-100 rounded'
          >
            <div className='flex items-start gap-2'>
              <img
                src={message.from_user_id.profile_picture}
                alt=""
                className='w-8 h-8 rounded-full'
              />
              <div className='flex-1'>
                <div className='flex justify-between'>
                  <p className='font-medium'>{message.from_user_id.full_name || message.from_user_id.name}</p>
                  <p className='text-[10px] text-slate-400'>
                    {moment(message.createdAt).fromNow()}
                  </p>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <p className='text-gray-500'>{message.text ? message.text : 'Media'}</p>
                  {!message.seen && (
                    <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>
                      1
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentMessages


