import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Messages from './pages/Messages';
import ChatBox from './pages/ChatBox';
import Connection from './pages/Connection';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import { useUser } from '@clerk/clerk-react';
import Layout from './pages/Layout';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { user } = useUser();

  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          {/* Default feed */}
          <Route index element={<Feed />} />

          {/* Messages */}
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />

          {/* Connections */}
          <Route path="connections" element={<Connection />} />

          {/* Discover */}
          <Route path="discover" element={<Discover />} />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />

          {/* Create Post */}
          <Route path="create-post" element={<CreatePost />} />
        </Route>

        {/* Optional: catch all route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;


