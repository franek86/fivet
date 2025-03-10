import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { createAddressBoookContactApi, fecthAddressBookApi } from "../services/apiAddressBook.js";
import { toast } from "react-toastify";
import { closeModalByName } from "../slices/modalSlice.js";

export const useCreateAddressBook = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createAddressBoookContactApi(data, user.id),
    onSuccess: () => {
      toast.success("Contact successfully added");
      dispatch(closeModalByName("address-book"));
      queryClient.invalidateQueries(["address-book"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};

export const useGetAddressBook = () => {
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["address-book"],
    queryFn: () => fecthAddressBookApi(user.id),
  });

  return { data, isLoading, isError };
};
