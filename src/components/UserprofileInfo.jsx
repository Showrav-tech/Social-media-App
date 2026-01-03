import React from 'react'
import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import moment from 'moment'

const UserprofileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className="relative py-4 px-6 md:px-8 bg-white">

      <div className="flex flex-col md:flex-row items-start gap-6">

        {/* Profile Picture */}
        <div className="
          w-32 h-32 rounded-full border-4 border-white
          shadow-lg absolute -top-16 bg-white
        ">
          <img
            src={user.profile_picture}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full pt-16 md:pt-0 md:pl-36">

          {/* Top Row */}
          <div className="flex flex-col md:flex-row items-start justify-between">

            {/* Name & Username */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.full_name}
                </h1>
                {user.verified && (
                  <Verified className="w-5 h-5 text-blue-500" />
                )}
              </div>

              <p className="text-gray-600">
                {user.username ? `@${user.username}` : 'Add a username'}
              </p>
            </div>

            {/* Edit Button (only own profile) */}
            {!profileId && (
              <button
                onClick={() => setShowEdit(true)}
                className="
                  flex items-center gap-2
                  border border-gray-300
                  hover:bg-gray-50
                  px-4 py-2 rounded-lg
                  font-medium transition-colors
                  mt-4 md:mt-0 cursor-pointer
                "
              >
                <PenBox className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-700 text-sm max-w-md mt-4">
              {user.bio}
            </p>
          )}

          {/* Location & Join Date */}
          <div className="
            flex flex-wrap items-center gap-x-6 gap-y-2
            text-sm text-gray-500 mt-4
          ">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {user.location || 'Add location'}
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Joined{' '}
              <span className="font-medium">
                {moment(user.createdAt).fromNow()}
              </span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-6 border-t border-gray-200 pt-4">
            <div>
              <span className="sm:text-xl font-bold text-gray-900">
                {posts?.length || 0}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                Posts
              </span>
            </div>

            <div>
              <span className="sm:text-xl font-bold text-gray-900">
                {user.followers?.length || 0}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                Followers
              </span>
            </div>

            <div>
              <span className="sm:text-xl font-bold text-gray-900">
                {user.following?.length || 0}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                Following
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserprofileInfo

