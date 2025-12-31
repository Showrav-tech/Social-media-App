import React from "react";
import { BadgeCheck, X } from "lucide-react";

const StoryViewer = ({ viewStory, setViewStory }) => {

  
  if (!viewStory) return null;

  const handleClose = () => setViewStory(null);

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory?.media_url || viewStory?.story?.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain"
          />
        );

      case "video":
        return (
          <video
            src={viewStory?.media_url || viewStory?.story?.media_url}
            className="max-h-screen"
            autoPlay
            controls
            onEnded={handleClose}
          />
        );

      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center">
            {viewStory?.text_content || viewStory?.story?.text_content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory?.background_color || "#000000"
            : "#000000",
      }}
      onClick={handleClose} // closes when clicking outside
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: "50%" }}
        />
      </div>

      {/* User Info */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
        <img
          src={viewStory?.user?.profile_picture}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory?.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* Content */}
      <div
        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking content
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;








