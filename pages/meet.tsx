import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Page from "@/components/layout/page";
import { Room, VideoPresets } from "livekit-client";
import {
  formatChatMessageLinks,
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import { useCreateStream } from "@livepeer/react";

export default function CustomRoomConnection() {
  const router = useRouter();
  const { liveKitUrl, token } = router.query;

  const room = new Room({
    videoCaptureDefaults: {
      resolution: VideoPresets.h540,
    },
    publishDefaults: {
      videoEncoding: {
        maxBitrate: 600_000,
        maxFramerate: 30,
      },
      screenShareEncoding: {
        maxBitrate: 1_000_000,
        maxFramerate: 30,
      },
    },
  });

  async function onConnected() {
    (window as any).currentRoom = room;
    const deviceInfo = JSON.parse(localStorage.getItem("deviceInfo") as string);
    console.log("das", deviceInfo);
    const audioEnabled = deviceInfo.micStatus == "On";
    const videoEnabled = deviceInfo.cameraStatus == "On";

    if (audioEnabled) {
      const audioDeviceId = deviceInfo.micDeviceId;
      console.log("mic Id:", audioDeviceId);
      if (audioDeviceId && room.options.audioCaptureDefaults) {
        room.options.audioCaptureDefaults.deviceId = audioDeviceId;
      }
      await room.localParticipant.setMicrophoneEnabled(true);
    }

    if (videoEnabled) {
      const videoDeviceId = deviceInfo.cameraDeviceId;
      console.log("mic Id:", videoDeviceId);
      if (videoDeviceId && room.options.videoCaptureDefaults) {
        room.options.videoCaptureDefaults.deviceId = videoDeviceId;
      }
      await room.localParticipant.setCameraEnabled(true);
    }
  }

  if (typeof liveKitUrl !== "string") {
    return <h2>Missing URL</h2>;
  }
  if (typeof token !== "string") {
    return <h2>Missing token</h2>;
  }

  return (
    <Page>
      <main data-lk-theme="default">
        {liveKitUrl && (
          <LiveKitRoom
            token={token}
            style={{
              height: "90vh",
            }}
            serverUrl={liveKitUrl}
            room={room}
            onConnected={() => {
              onConnected();
            }}
            audio={false}
            video={false}
          >
            <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          </LiveKitRoom>
        )}
      </main>
    </Page>
  );
}
