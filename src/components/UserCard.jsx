import React, { useState } from 'react'
import { MapPin, Plus, UserPlus, MessageSquare } from 'lucide-react'

const UserCard = ({ user, currentUser }) => {
  const [hoverFollow, setHoverFollow] = useState(false)

  const isFollowing = currentUser?.following?.includes(user._id)
  const isConnected = currentUser?.connections?.includes(user._id)

  const handleFollow = () => {
    console.log(isFollowing ? 'Unfollow' : 'Follow', user._id)
  }

  const handleConnectionRequest = () => {
    console.log('Connection clicked:', user._id)
  }

  return (
    <div className="
      w-72 p-4 pt-6 bg-white
      border border-gray-200 rounded-lg shadow-sm
      transition-all duration-300
      hover:shadow-lg hover:-translate-y-1
      cursor-pointer
    ">

      {/* User Info */}
      <div className="text-center">
        <img
          src={user.profile_picture}
          alt={user.full_name}
          className="
            w-16 h-16 mx-auto rounded-full object-cover
            border shadow transition-transform duration-300
            hover:scale-105
          "
        />

        <p className="mt-4 font-semibold text-slate-900">
          {user.full_name}
        </p>

        {user.username && (
          <p className="text-gray-500 text-sm">@{user.username}</p>
        )}

        {user.bio && (
          <p className="mt-2 text-sm text-gray-600 px-4 line-clamp-2">
            {user.bio}
          </p>
        )}
      </div>

      {/* Location & Followers */}
      <div className="flex justify-center gap-2 mt-4 text-xs text-gray-600">
        {user.location && (
          <div className="flex items-center gap-1 border rounded-full px-3 py-1">
            <MapPin className="w-4 h-4" />
            {user.location}
          </div>
        )}

        <div className="flex items-center gap-1 border rounded-full px-3 py-1">
          <span className="font-medium">
            {user.followers?.length || 0}
          </span>
          Followers
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-5">

        {/* Follow / Following Button */}
        <button
          onMouseEnter={() => setHoverFollow(true)}
          onMouseLeave={() => setHoverFollow(false)}
          onClick={handleFollow}
          className={`
            flex items-center justify-center gap-1
            w-full py-2 rounded-md text-sm font-medium
            transition-all duration-200 cursor-pointer
            ${
              isFollowing
                ? `
                  bg-gray-100 text-gray-700 border border-gray-300
                  hover:bg-red-50 hover:text-red-600 hover:border-red-400
                  hover:scale-[1.02]
                `
                : `
                  bg-blue-500 text-white
                  hover:bg-blue-600 hover:scale-[1.03]
                  active:scale-95
                `
            }
          `}
        >
          <UserPlus className="w-4 h-4" />
          {isFollowing
            ? hoverFollow
              ? 'Unfollow'
              : 'Following'
            : 'Follow'}
        </button>

        {/* Message / Connect Button */}
        <button
          onClick={handleConnectionRequest}
          className="
            flex items-center justify-center
            w-12 h-10 border rounded-md
            text-slate-500
            transition-all duration-200
            cursor-pointer
            hover:bg-slate-100 hover:scale-110
            active:scale-95
            group
          "
        >
          {isConnected ? (
            <MessageSquare className="w-5 h-5 group-hover:text-blue-500 transition" />
          ) : (
            <Plus className="w-5 h-5 group-hover:text-green-500 transition" />
          )}
        </button>

      </div>
    </div>
  )
}

export default UserCard



