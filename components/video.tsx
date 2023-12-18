import React, { useState, useEffect, useRef } from "react";
import Select from "./select";
import Camera from "@/assets/icons/camera";
import Mic from "@/assets/icons/mic";

interface MediaDeviceInfo {
  deviceId: string;
  label: string;
  kind: string;
}

interface Devices {
  audioDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  speakerDevices: MediaDeviceInfo[];
}

interface VideoProps {
  onMeetingInfo: (MeetingInfo: MeetingInfo) => void;
}

export interface MeetingInfo {
  name?: string;
  micStatus: string;
  cameraStatus: string;
  micDeviceId: string;
  cameraDeviceId: string;
}

const Video: React.FC<VideoProps> = ({ onMeetingInfo }) => {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<Devices>({
    audioDevices: [],
    videoDevices: [],
    speakerDevices: [],
  });
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedSpeakerDevice, setSelectedSpeakerDevice] =
    useState<string>("");
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        fetchDevices();
      } catch (error) {
        console.error("Error accessing camera and microphone:", error);
      }
    };

    requestPermission();
  }, []);

  const fetchDevices = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((availableDevices) => {
        const audioDevices = availableDevices.filter(
          (device) => device.kind === "audioinput"
        );
        const videoDevices = availableDevices.filter(
          (device) => device.kind === "videoinput"
        );
        const speakerDevices = availableDevices.filter(
          (device) => device.kind === "audiooutput"
        );
        setDevices({ audioDevices, videoDevices, speakerDevices });

        setSelectedAudioDevice(
          audioDevices.length > 0 ? audioDevices[0].deviceId : ""
        );
        setSelectedVideoDevice(
          videoDevices.length > 0 ? videoDevices[0].deviceId : ""
        );
        setSelectedSpeakerDevice(
          speakerDevices.length > 0 ? speakerDevices[0].deviceId : ""
        );
      })
      .catch((error) => {
        console.error("Error enumerating media devices:", error);
      });
  };

  useEffect(() => {
    if (selectedVideoDevice) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: selectedVideoDevice },
          audio: selectedAudioDevice
            ? { deviceId: selectedAudioDevice }
            : false,
        })
        .then((stream) => {
          setVideoStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  }, [selectedAudioDevice, selectedVideoDevice]);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  useEffect(() => {
    if (selectedSpeakerDevice) {
      //@ts-ignore
      const audioOutput = videoRef.current?.sinkId;
      if (audioOutput && "setSinkId" in videoRef.current) {
        //@ts-ignore
        videoRef.current
          .setSinkId(selectedSpeakerDevice)
          .then(() => {
            console.log("Speaker set successfully");
          })
          .catch((error: any) => {
            console.error("Error setting speaker:", error);
          });
      }
    }
  }, [selectedSpeakerDevice]);

  useEffect(() => {
    const info: MeetingInfo = {
      micStatus: isMicMuted ? "Off" : "On",
      cameraStatus: isCameraOff ? "Off" : "On",
      micDeviceId: selectedAudioDevice,
      cameraDeviceId: selectedVideoDevice,
    };

    onMeetingInfo(info);
  }, [isMicMuted, isCameraOff, selectedAudioDevice, selectedVideoDevice]);

  const toggleMicMute = () => {
    if (videoStream) {
      const audioTracks = videoStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isMicMuted;
        setIsMicMuted(!isMicMuted);
      }
    }
  };

  const toggleCameraOff = () => {
    setIsCameraOff((prevIsCameraOff) => !prevIsCameraOff);
  };

  useEffect(() => {
    if (videoStream) {
      const videoTracks = videoStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !isCameraOff;
      }
    }
  }, [videoStream, isCameraOff]);

  return (
    <div className="flex flex-col items-center mt-8 w-[40rem]">
      <div className="relative mb-4 w-full">
        {videoStream ? (
          <>
            <video
              autoPlay
              playsInline
              muted
              ref={videoRef}
              className="w-full h-[25rem] object-cover rounded-lg"
            />
          </>
        ) : (
          <div className="w-full h-[25rem] bg-zinc-800 object-cover rounded-lg" />
        )}
        {!videoStream && isCameraOff && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black" />
        )}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-2">
          <div
            className={`p-3 items-center flex justify-cente rounded-full mr-4 ${
              isMicMuted ? " bg-red-600" : " bg-black bg-opacity-25"
            }`}
            onClick={toggleMicMute}
          >
            <Mic isOff={isMicMuted} size={25} color="#fff" />
          </div>

          <div
            className={`p-3 items-center flex justify-cente rounded-full ${
              isCameraOff ? " bg-red-600" : " bg-black bg-opacity-25"
            }`}
            onClick={toggleCameraOff}
          >
            <Camera isOff={isCameraOff} size={25} color="#fff" />
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-row w-full">
        <div className="mb-4">
          <Select
            value={selectedAudioDevice}
            onChange={(e) => setSelectedAudioDevice(e)}
            label="Mic"
            options={devices.audioDevices}
          />
        </div>
        <div className="mb-4">
          <Select
            value={selectedVideoDevice}
            label="Camera"
            onChange={(e) => setSelectedVideoDevice(e)}
            options={devices.videoDevices}
          />
        </div>
        <div className="mb-4">
          <Select
            label="Speaker"
            value={selectedSpeakerDevice}
            onChange={(e) => setSelectedSpeakerDevice(e)}
            options={devices.speakerDevices}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
