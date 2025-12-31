import React, { useState } from "react";
import { ArrowLeft, Sparkle, Text } from "lucide-react";
import toast from "react-hot-toast";

const StoryModal = ({ setShowModal, fetchStories }) => {
  const colors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"];

  const [mode, setMode] = useState("text");
  const [bg, setBg] = useState(colors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);

  const uploadMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMedia(file);
    setPreview(URL.createObjectURL(file));
    setMode("media");
  };

  const createStory = async () => {
    if (mode === "text" && !text.trim()) throw new Error("Text required");
    if (mode === "media" && !media) throw new Error("Select media");

    await new Promise((r) => setTimeout(r, 1000));
    fetchStories?.();
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <button onClick={() => setShowModal(false)}>
            <ArrowLeft />
          </button>
          <h2 className="font-semibold">Create Story</h2>
          <span />
        </div>

        {/* Preview */}
        <div
          className="h-96 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          {mode === "text" && (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-full p-6 bg-transparent resize-none outline-none"
              placeholder="What's on your mind?"
            />
          )}

          {mode === "media" &&
            (media?.type.startsWith("image") ? (
              <img src={preview} className="max-h-full" />
            ) : (
              <video src={preview} controls className="max-h-full" />
            ))}
        </div>

        {/* Colors */}
        <div className="flex gap-2 mt-4">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setBg(c)}
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setMode("text")}
            className={`flex-1 p-2 rounded ${
              mode === "text" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            <Text size={18} /> Text
          </button>

          <label className="flex-1 p-2 rounded bg-zinc-800 cursor-pointer text-center">
            Media
            <input type="file" hidden accept="image/*,video/*" onChange={uploadMedia} />
          </label>
        </div>

        <button
          onClick={() =>
            toast.promise(createStory(), {
              loading: "Saving...",
              success: "Story Added",
              error: (e) => e.message,
            })
          }
          className="mt-4 w-full py-3 rounded bg-gradient-to-r
          from-indigo-600 to-purple-600"
        >
          <Sparkle size={18} /> Create Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;




