import React from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyConnectionsData } from '../assets/assets'
import { Eye, MessageSquare } from 'lucide-react'

const Messages = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Messages
          </h1>
          <p className="text-slate-600">
            Talk to anyone
          </p>
        </div>

        {/* Connected Users */}
        <div className="flex flex-col gap-4">
          {dummyConnectionsData.map((user) => (
            <div
              key={user._id}
              className="max-w-xl flex items-center gap-5 p-5 bg-white shadow rounded-lg"
            >
              {/* Profile Image */}
              <img
                src={user.profile_picture}
                alt={user.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* User Info */}
              <div className="flex-1">
                <p className="font-medium text-slate-800">
                  {user.full_name}
                </p>
                <p className="text-sm text-slate-500">
                  @{user.username}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {user.bio}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 text-gray-700" />
                </button>

                <button   onClick={() => navigate(`/profile/${user._id}`)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition hover:scale-105"
                >
                  <Eye className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Messages

