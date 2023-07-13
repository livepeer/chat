import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { streamId, roomId, record } = req.body;

    if (!streamId && roomId && record) {
      const createStreamResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_LP_HOST}/api/stream`,
        {
          name: `room_${roomId}`,
          record: true,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
            "Content-Type": "application/json",
          },
        }
      );

      const createdStreamId = createStreamResponse.data.id;

      if (createdStreamId) {
        const startRoomEgressResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_LP_HOST}/api/room/${roomId}/egress`,
          {
            streamId: createdStreamId,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = startRoomEgressResponse.data;
        res.status(200).json(data);
        return;
      }
    }

    const startRoomEgressResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_LP_HOST}/api/room/${roomId}/egress`,
      {
        streamId: streamId,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = startRoomEgressResponse.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
