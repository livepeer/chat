import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { roomId } = req.body;
      console.log(roomId);
      const stream = await axios.post(
        `${process.env.NEXT_PUBLIC_LP_HOST}/api/stream`,
        {
          name: roomId,
          record: true,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(stream.data.id);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LP_HOST}/api/room/${req.body.roomId}/egress`,
        {
          streamId: stream.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      const data = response.data;
      res.status(200).json(data);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
