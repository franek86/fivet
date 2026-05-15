import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Spinner from "../Spinner.jsx";
import ProfileImageUploader from "./ProfileImageUploader.jsx";

import styled from "styled-components";

import { useGetUserProfile, useUpdateProfile } from "../../hooks/useProfile.js";

const StyledForm = styled.form`
  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3rem 0;
    gap: 10px;

    .profile-header-left {
      display: flex;
      gap: 20px;
      .profile-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .email {
          font-size: 13px;
          color: var(--color-text-muted);
        }
      }
    }
  }

  .profile-grid {
    display: grid;
    gap: 20px;
    margin-bottom: 20px;

    @media screen and (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

function ProfileData() {
  const { data, isLoading } = useGetUserProfile();
  const { mutate: updateProfile, isPending: loadUpdateProfile } = useUpdateProfile(data);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      city: "",
      zidCode: "",
      address: "",
      avatar: data?.avatar || null,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        fullName: data?.fullName || "",
        email: data?.user?.email || "",
        country: data?.user?.country || "",
        city: data?.user?.city || "",
        zidCode: data?.user?.zidCode || "",
        address: data?.user?.address || "",
        avatar: data?.avatar || null,
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
      <div className='profile-header'>
        <div className='profile-header-left'>
          <ProfileImageUploader name='avatar' value={watch("avatar")} initialImage={data?.avatar} onChange={handleAvatarChange} />
          <div className='profile-info'>
            <h2 className='name'>{data?.fullName}</h2>
            <div className='email'>{data?.user.email}</div>
          </div>
        </div>
        <Button>{loadUpdateProfile ? "Editing..." : "Edit"}</Button>
      </div>
      <div className='profile-grid'>
        <Input register={register} {...register("fullName")} label='Full name' directions='column' />
        <Input type='email' register={register} {...register("email")} label='Email' directions='column' />
      </div>
      <div className='profile-grid'>
        <Input register={register} {...register("country")} label='Country' directions='column' />
        <Input register={register} {...register("city")} label='City' directions='column' />
      </div>
      <div className='profile-grid'>
        <Input register={register} {...register("zipCode")} label='Zip code' directions='column' />
        <Input register={register} {...register("address")} label='Address' directions='column' />
      </div>
    </StyledForm>
  );
}

export default ProfileData;
