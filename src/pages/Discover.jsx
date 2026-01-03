import React, { useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Search } from 'lucide-react'
import UserCard from '../components/UserCard'

const Discover = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState(dummyConnectionsData)
  const [loading, setLoading] = useState(false)

  // fake logged-in user
  const currentUser = dummyConnectionsData[0]

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true)

      setTimeout(() => {
        const filtered = dummyConnectionsData.filter(user =>
          user.full_name.toLowerCase().includes(input.toLowerCase()) ||
          user.username?.toLowerCase().includes(input.toLowerCase()) ||
          user.bio?.toLowerCase().includes(input.toLowerCase()) ||
          user.location?.toLowerCase().includes(input.toLowerCase())
        )

        setUsers(filtered)
        setLoading(false)
      }, 600)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Discover People
          </h1>
          <p className="text-slate-600">
            Connect with people and grow your network
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 shadow-md rounded-md border bg-white">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search people..."
                className="pl-10 py-2 w-full border rounded-md"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Users */}
        {loading ? (
          <p className="text-center text-gray-500">Searching...</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {users.map(user => (
              <UserCard
                key={user._id}
                user={user}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Discover



