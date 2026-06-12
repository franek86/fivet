import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import socket from "../shared/socket.js";

export function useUserSocket(userId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handlePublishedShipNotify = (payload) => {
      if (payload.authorId !== userId) return;
      toast.success(`Your ship ${payload.shipName} has been published by admin`);
      queryClient.invalidateQueries({ queryKey: ["ships"] });
    };

    socket.on("ship:published", handlePublishedShipNotify);

    return () => {
      socket.off("ship:published", handlePublishedShipNotify);
    };
  }, [queryClient, userId]);
}
