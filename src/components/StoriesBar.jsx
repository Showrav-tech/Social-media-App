import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";

const StoriesBar = ({ fetchStories }) => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  useEffect(() => {
    setStories(dummyStoriesData);
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">

        {/* Create Story */}
        <div
          onClick={() => setShowModal(true)}
          className="min-w-[120px] aspect-[3/4] rounded-lg border-2
          border-dashed border-indigo-300 bg-indigo-50
          flex flex-col items-center justify-center cursor-pointer
          hover:shadow-lg transition"
        >
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
            <Plus className="text-white" />
          </div>
          <p className="text-sm font-medium">Create story</p>
        </div>

        {/* Stories */}
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setViewStory(story)}
            className="relative min-w-[120px] max-h-[160px]
            rounded-lg overflow-hidden cursor-pointer
            bg-gradient-to-b from-indigo-500 to-purple-600
            hover:shadow-lg transition"
          >
            {story.media_type !== "text" && (
              story.media_type === "image" ? (
                <img
                  src={story.media_url}
                  className="w-full h-full object-cover opacity-70"
                />
              ) : (
                <video
                  src={story.media_url}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover opacity-70"
                />
              )
            )}

            <img
              src={story.user.profile_picture}
              className="absolute top-3 left-3 w-8 h-8 rounded-full ring-2 ring-white"
            />

            {story.content && (
              <p className="absolute top-20 left-3 text-sm text-white truncate max-w-[96px]">
                {story.content}
              </p>
            )}

            <p className="absolute bottom-1 right-2 text-xs text-white">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <StoryModal
          setShowModal={setShowModal}
          fetchStories={fetchStories}
        />
      )}

      {viewStory && (
        <StoryViewer
          viewStory={viewStory}
          setViewStory={setViewStory}
        />
      )}
    </div>
  );
};

export default StoriesBar;






