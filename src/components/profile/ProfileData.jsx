import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import ImageUploader from "../ImageUplader.jsx";
import Spinner from "../Spinner.jsx";

import styled from "styled-components";
import { useUploadSingleImage } from "../../hooks/files/useUploadSingleImage.js";
import { useImagePublicUrl } from "../../hooks/files/useImagePublicUrl.js";
import { useProfileData, useUpdateProfile } from "../../hooks/useProfile.js";

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
const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  height: 30rem;
  width: 30rem;
  border-radius: 50%;
`;

function ProfileData() {
  const { mutate: uploadAvatar } = useUploadSingleImage();
  const { mutate: getImageUrl } = useImagePublicUrl();
  const { data, isLoading } = useProfileData();
  const { mutate: updateProfile } = useUpdateProfile();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      avatar: data?.avatar || null,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName || "",
        email: data.email || "",
        avatar: data.avatar || null,
      });
    }
  }, [data, reset]);

  const handleOnSubmit = (data) => {
    const file = data.avatar;

    if (file instanceof File) {
      var filePath = `${Date.now()}${Math.floor(Math.random() * 10000)}-${file.name.replaceAll(/\s/g, "-")}`;
      var bucket = "avatar";
      uploadAvatar(
        { file, bucket, filePath },
        {
          onSuccess: (filePath) => {
            getImageUrl(
              { filePath, bucket },
              {
                onSuccess: (imageUrl) => {
                  updateProfile({
                    ...data,
                    avatar: imageUrl,
                  });
                },
              }
            );
          },
        }
      );
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
        <Button>Edit</Button>
      </StyledInfo>
      <StyledAvatar>
        {data.avatar ? (
          <ImageUploader name='avatar' value={watch("avatar")} initialImage={data.avatar} onChange={handleAvatarChange} />
        ) : (
          <StyledImage src={data.avatar} />
        )}
      </StyledAvatar>
    </StyledForm>
  );
}

export default ProfileData;
