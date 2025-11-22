import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import ImageUploader from "../ImageUploader.jsx";
import Spinner from "../Spinner.jsx";

import styled from "styled-components";

import { useUser } from "../../hooks/useAuth.js";
import { useUpdateProfile } from "../../hooks/useProfile.js";

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem;
  margin-top: 3rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledInfo = styled.div`
  display: grid;
  gap: 10px;
`;

function ProfileData() {
  const { data, isLoading } = useUser();
  const { mutate: updateProfile, isPending: loadUpdateProfile } = useUpdateProfile();

  const { register, formState, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      avatar: data?.profile.avatar || null,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.profile.fullName || "",
        email: data.profile.email || "",
        avatar: data.profile.avatar || null,
      });
    }
  }, [data, reset]);

  const handleOnSubmit = (data) => {
    const file = data.avatar;

    if (file instanceof File) {
      updateProfile({ ...data, avatar: file });
    } else {
      updateProfile(data);
    }
  };

  const handleAvatarChange = (file) => {
    setValue("avatar", file);
  };

  if (isLoading) return <Spinner />;

  return (
    <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
      <StyledInfo>
        <Input register={register} {...register("fullName")} />
        <Input type='email' register={register} {...register("email")} />
        <Button>{loadUpdateProfile ? "Updating..." : "Edit"}</Button>
      </StyledInfo>
      <ImageUploader name='avatar' value={watch("avatar")} initialImage={data.profile.avatar} onChange={handleAvatarChange} />
    </StyledForm>
  );
}

export default ProfileData;
