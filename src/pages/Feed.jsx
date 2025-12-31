import React, { useState, useEffect } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'

const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories & posts */}
      <div>
        <StoriesBar />
        <div className='p-4 space-y-6'>
          {feeds.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className='hidden xl:flex flex-col w-64 space-y-6'>
        <div>
          <h1 className='font-semibold'>Sponsored</h1>
        </div>
        <div>
          <h1 className='font-semibold'>Recent messages</h1>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Feed


