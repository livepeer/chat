import { Fragment, useRef, useState } from "react";
import Input from "./input";
import Button from "./button";

export default function Modal({
  onClose,
  onChange,
  streamId,
  onBroadcast,
}: {
  onClose: () => void;
  onBroadcast: () => void;
  onChange: (e: any) => void;
  streamId: string | undefined;
}) {
  return (
    <div className="fixed inset-0 z-10 ">
      <div className="flex min-h-full justify-center items-center">
        <div className="fixed inset-0 bg-black opacity-30"></div>{" "}
        {/* Black overlay */}
        <div className="p-4 relative rounded-lg bg-[#1D1F2D] text-left shadow-xl w-1/3">
          <h3 className="font-medium text-white">Broadcast meeting</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Create a livestream using Studio and enter the stream id below
          </p>
          <Input
            onChange={onChange}
            value={streamId}
            placeholder="stream id"
            className="w-full"
          />
          <div className="flex flex-row-reverse mt-4">
            <Button onClick={onBroadcast}>Start Broadcasting</Button>
            <Button onClick={onClose} secondary>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
