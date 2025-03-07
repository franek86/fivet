import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createAddressBoookContactApi } from "../services/apiAddressBook.js";

export const useCreateAddressBook = () => {
  const user = useSelector((state) => state.auth.user);
  const { mutate, isPending } = useMutation({
    mutationFn: () => createAddressBoookContactApi(user.id),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { mutate, isPending };
};
