import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "../modal";

export default function Navbar() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [streamId, setStreamId] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { query } = useRouter();

  const toggleOptionsDropdown = () => {
    setShowOptions(!showOptions);
  };

  const startRoomEgress = ({ record }: { record?: boolean }) => {
    if (!record && !streamId) {
      alert("Please enter a valid stream id");
      return;
    }
    axios
      .post("/api/start-rtmp-egress", {
        streamId,
        record,
        roomId: query.roomId,
      })
      .then(() => {
        if (record) {
          setIsRecording(true);
        } else {
          setIsBroadcasting(true);
        }
        toggleOptionsDropdown();
      });
  };

  const copyMeetingLink = () => {
    const link = `https://livepeer.chat/room/${query.roomId}`;
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <header className="border-[#292B38] border-b ">
      <nav className="flex px-8 items-center justify-between h-16">
        <Link
          href={"/"}
          className="font-satoshi-medium text-white text-xl cursor-pointer"
        >
          Livepeer Chat
        </Link>
        <svg
          fill="currentColor"
          className="cursor-pointer"
          onClick={toggleOptionsDropdown}
          viewBox="0 0 16 16"
          height="1.2em"
          width="1.2em"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
        </svg>
      </nav>
      {showOptions && (
        <div className="z-10 overflow-hidden bg-[#292b38] rounded-lg absolute -mt-3 right-10">
          <div className="text-sm text-gray-200">
            <p
              onClick={() => startRoomEgress({ record: true })}
              className="px-4 py-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
            >
              {isRecording ? "Recording in progress..." : "Record Meeting"}
            </p>
            <p
              onClick={() => {
                setShowModal(true);
                toggleOptionsDropdown();
              }}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700"
            >
              {isBroadcasting
                ? "Broadcasting in progress..."
                : "Broadcast meeting"}
            </p>
            <p
              onClick={copyMeetingLink}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
            >
              {isCopied ? "Copied to Clipboard " : "Copy Meeting Link"}
            </p>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onChange={(e) => {
            setStreamId(e.target.value);
          }}
          onBroadcast={() => {
            startRoomEgress({ record: false });
          }}
          streamId={streamId}
        />
      )}
    </header>
  );
}
