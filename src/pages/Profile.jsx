import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { dummyPostsData, dummyUserData } from '../assets/assets'
import UserprofileInfo from '../components/UserprofileInfo'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

const Profile = () => {
  const { profileId } = useParams()

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (!user) return <Loading />

  return (
    <div className="relative h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* Cover Photo */}
          <div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* User Info */}
          <UserprofileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
            {['posts', 'media', 'likes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 px-4 py-2 text-sm font-medium rounded-lg
                  transition-colors cursor-pointer
                  ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* POSTS TAB */}
          {activeTab === 'posts' && (
            <div className="mt-6 flex flex-col items-center gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* MEDIA TAB */}
          {activeTab === 'media' && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {posts
                .filter((post) => post.image_urls?.length > 0)
                .flatMap((post) =>
                  post.image_urls.map((image, index) => (
                    <a
                      key={`${post._id}-${index}`}
                      href={image}
                      target="_blank"
                      rel="noreferrer"
                      className="relative group"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <p className="
                        absolute bottom-1 right-1
                        text-xs px-2 py-1 rounded
                        bg-black/40 backdrop-blur
                        text-white
                      ">
                        Posted {moment(post.createdAt).fromNow()}
                      </p>
                    </a>
                  ))
                )}
            </div>
          )}

          {/* LIKES TAB */}
          {activeTab === 'likes' && (
            <div className="mt-6 text-center text-gray-500">
              No liked posts yet
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal Placeholder */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p>Edit profile modal</p>
            <button
              onClick={() => setShowEdit(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

