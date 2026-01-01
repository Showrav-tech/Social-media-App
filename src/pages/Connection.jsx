import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections
} from '../assets/assets';

const Connection = () => {
  const [currentTab, setCurrentTab] = useState('Followers');
  const navigate = useNavigate();

  const dataArray = [
    { label: 'Followers', value: followers },
    { label: 'Following', value: following },
    { label: 'Pending', value: pendingConnections },
    { label: 'Connections', value: connections }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Connections</h1>
          <p className="text-slate-600">
            Manage your network and discover new connections
          </p>
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm mb-6">
          {dataArray.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setCurrentTab(tab.label)}
              className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                currentTab === tab.label
                  ? 'bg-white font-medium text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label} ({tab.value.length})
            </button>
          ))}
        </div>

        {/* Connections Cards */}
        <div className="flex flex-col gap-4">
          {dataArray
            .find((item) => item.label === currentTab)
            ?.value.map((user) => (
              <div
                key={user._id}
                className="flex items-center w-full bg-white shadow rounded-lg p-4"
              >
                {/* Profile Image */}
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                {/* User Info */}
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg text-slate-900">{user.full_name}</h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  <p className="text-sm text-gray-600">
                    {user.bio ? user.bio.slice(0, 50) : ''}...
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
                  >
                    View Profile
                  </button>

                  {currentTab === 'Following' && (
                    <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-sm">
                      Unfollow
                    </button>
                  )}

                  {currentTab === 'Pending' && (
                    <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-sm">
                      Accept
                    </button>
                  )}

                  {currentTab === 'Connections' && (
                    <button
                      onClick={() => navigate(`/messages/${user._id}`)}
                      className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-sm"
                    >
                      Message
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Connection;




