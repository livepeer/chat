import Button from "@/components/button";
import Input from "@/components/input";
import Page from "@/components/layout/page";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import natureHero from "../assets/hero.json";
import Lottie from "lottie-react";
import { daysOfWeek, monthsOfYear } from "@/constants";

export default function Home() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [roomId, setRoomId] = useState<string>();

  const createRoom = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/create-room");
      const { id } = response.data;
      push(`/room/${id}`);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const joinRoom = () => {
    if (roomId) {
      const regex =
        /^(https?:\/\/(?:[\w-]+\.)*[\w-]+(?:\/[\w-]+)*\/room\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}|\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/;
      if (regex.test(roomId)) {
        const id = roomId.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        if (id) {
          push(`/room/${id}`);
        } else {
          toast.error("Invalid link or id", {
            style: {
              borderRadius: "10px",
              background: "#252735",
              color: "#fff",
            },
          });
        }
      } else {
        toast.error("Invalid link or id", {
          style: {
            borderRadius: "10px",
            background: "#252735",
            color: "#fff",
          },
        });
      }
    } else {
      toast.error("Invalid link or id", {
        style: {
          borderRadius: "10px",
          background: "#252735",
          color: "#fff",
        },
      });
    }
  };

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = monthsOfYear[currentDate.getMonth()];
  const day = currentDate.getDate();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return (
    <Page>
      <div className="absolute  overflow-hidden top-0 -right-40 h-screen">
        <Lottie
          animationData={natureHero}
          loop
          className="w-full h-full -mt-2"
        />
      </div>
      <div className=" relative px-8 flex  h-full flex-col  justify-center  z-20">
        <p className="text-6xl font-satoshi-regular text-slate-100 ">
          {hours}:{minutes}
        </p>
        <p className="text-md font-satoshi-regular text-slate-300 mt-5 ">
          {dayOfWeek}, {month} {day}
        </p>
        <div className="mt-6 flex w-full flex-wrap items-center">
          <Button onClick={createRoom} className="mr-4 w-40		">
            {isLoading ? "Creating..." : "Create Meeting"}
          </Button>
          <div className=" -mt-2 flex items-center">
            <Input
              onChange={handleOnChange}
              value={roomId}
              className="w-[15rem]"
              placeholder="Enter a code or link"
            />
            {roomId && (
              <p
                onClick={joinRoom}
                className="ml-4 font-satoshi-medium text-teal-500 cursor-pointer hover:text-teal-600"
              >
                Join
              </p>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
