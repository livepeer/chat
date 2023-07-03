import { NextApiRequest, NextApiResponse } from "next";

export default async function createRoomHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LP_HOST}/api/room`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LP_AUTH}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create room" });
  }
}
