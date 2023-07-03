import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      console.log(req.body);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LP_HOST}/api/room/${req.body.roomId}/egress`,
        {
          streamId: req.body.streamId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
            "Content-Type": "application/json",
          },
        }
      );

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
