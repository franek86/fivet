import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddressBoookContactApi,
  deleteSingleAddressBookApi,
  editAddressBoookContactApi,
  fecthAddressBookApi,
} from "../services/apiAddressBook.js";
import { toast } from "react-toastify";
import { closeModalByName } from "../slices/modalSlice.js";

export const useCreateAddressBook = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
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

  return { mutate, isPending, isSuccess };
};

export const useGetAddressBook = () => {
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["address-book"],
    queryFn: () => fecthAddressBookApi(user.id),
    placeholderData: (previousData) => {
      if (previousData && previousData.length > 0) {
        return Array.from({ length: previousData.length }, () => ({}));
      }
    },
  });

  return { data, isLoading, isError, isFetching };
};

export const useEditAddressBook = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ newData, id }) => editAddressBoookContactApi(newData, id),
    onSuccess: () => {
      toast.success("Address book successfully edited.");
      dispatch(closeModalByName("address-book"));
      queryClient.invalidateQueries(["address-book"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isSuccess };
};

export const useDeleteAddressBook = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteSingleAddressBookApi(id),
    onSuccess: () => {
      toast.success("Address book deleted.");
      queryClient.invalidateQueries(["address-book"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate };
};
