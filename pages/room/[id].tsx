import Button from "@/components/button";
import Input from "@/components/input";
import Page from "@/components/layout/page";
import Video, { MeetingInfo } from "@/components/video";
import axios from "axios";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";

export default function Room() {
  const { query, push } = useRouter();
  const [name, setName] = useState<string>();
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>();

  const roomID = query.id;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const joinMeeting = async (): Promise<void> => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    localStorage.setItem("deviceInfo", JSON.stringify(meetingInfo));
    localStorage.setItem("name", name);
    try {
      const response = await axios.post("/api/create-user", {
        name,
        roomID,
      });
      const roomInfo = response.data.joinUrl.replace(
        /^https:\/\/meet\.livepeer\.chat\/custom\?/,
        ""
      );
      push(`/meet?${roomInfo}&roomId=${roomID}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Page>
      <div className="px-8 flex  h-full flex-row items-center justify-between w-full">
        <div>
          <p className="text-6xl font-satoshi-regular text-slate-100 ">
            Ready to join?
          </p>
          <p className="text-md font-satoshi-regular text-slate-300 mt-5 mb-5">
            If you are ready, type your name and click join meeting.
          </p>
          <Input
            onChange={handleOnChange}
            value={name}
            className="w-[15rem]"
            placeholder="Your name"
          />
          <Button onClick={joinMeeting} className="ml-4">
            Join Meeting
          </Button>
        </div>
        <Video onMeetingInfo={(info) => setMeetingInfo(info)} />
      </div>
    </Page>
  );
}
