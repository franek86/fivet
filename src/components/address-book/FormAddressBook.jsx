import { useForm } from "react-hook-form";

import Input from "../ui/Input.jsx";

import styled from "styled-components";
import Button from "../ui/Button.jsx";
import TextArea from "../ui/TextArea.jsx";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;

function FormAddressBook() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onHandleSubmit = (data) => {
    console.log(data);
  };
  return (
    <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid>
        <Input directions='column' label='First name' register={register} {...register("first_name")} />
        <Input directions='column' label='Last name' register={register} {...register("last_name")} />
        <Input type='email' directions='column' label='Email' register={register} {...register("email")} />
        <Input directions='column' label='Phone number' register={register} {...register("phone_number")} />
        <Input directions='column' label='Mobile number' register={register} {...register("mobile_number")} />
        <Input directions='column' label='Country' register={register} {...register("country")} />
        <Input directions='column' label='Address' register={register} {...register("address")} />
        <Input directions='column' label='Second address' register={register} {...register("addres_2")} />
        <Input directions='column' label='Company' register={register} {...register("company")} />
        <Input type='url' directions='column' label='Linkedin' register={register} {...register("linkedin_link")} />
        <Input type='url' directions='column' label='Facebook' register={register} {...register("facebook_link")} />
        <Input type='url' directions='column' label='Instagram' register={register} {...register("instagram_link")} />
        <Input type='url' directions='column' label='Tik Tok' register={register} {...register("tiktok_link")} />
      </Grid>
      <TextArea directions='column' label='Note' register={register} {...register("note")}></TextArea>
      <Button>Save</Button>
    </StyledForm>
  );
}

export default FormAddressBook;
