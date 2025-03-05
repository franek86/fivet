import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import ImageUploader from "../ImageUplader.jsx";

import styled from "styled-components";

const StyledWrap = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  margin-top: 3rem;
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
  const firstName = useSelector((state) => state.profile.firstName);
  const lastName = useSelector((state) => state.profile.lastName);
  const emailUser = useSelector((state) => state.profile.email);
  const avatar = useSelector((state) => state.profile.avatar);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      email: emailUser,
    },
  });

  useEffect(() => {
    reset({
      first_name: firstName,
      last_name: lastName,
      email: emailUser,
    });
  }, [reset]);

  return (
    <StyledWrap>
      <StyledInfo>
        <Input register={register} {...register("first_name")} />
        <Input register={register} {...register("last_name")} />
        <Input register={register} {...register("email")} />
        <Button>Edit</Button>
      </StyledInfo>
      <StyledAvatar>
        {avatar ? (
          <ImageUploader value={watch("avatar")} initialImage={avatar} onChange={(file) => setValue("avatar", file)} />
        ) : (
          <StyledImage src={avatar} />
        )}
      </StyledAvatar>
    </StyledWrap>
  );
}

export default ProfileData;
