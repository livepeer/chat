import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Join() {
  const { push, query } = useRouter();
  const { room } = query;

  useEffect(() => {
    if (room) {
      push(`/room/${room}`);
    }
  }, [room]);

  return <div />;
}
