import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import TextArea from "../ui/TextArea.jsx";
import Spinner from "../../components/Spinner.jsx";

import styled from "styled-components";
import { useCreateAddressBook, useEditAddressBook } from "../../hooks/useAddressBook.js";
import CustomPhoneInput from "../ui/CustomPhoneInput.jsx";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

function FormAddressBook({ addressBookToEdit = {} }) {
  const { mutate: create, isPending, isSuccess } = useCreateAddressBook();
  const { mutate: edit, isPending: editIsPending, isSuccess: editIsSuccess } = useEditAddressBook();

  const { id, ...editValues } = addressBookToEdit;
  const isEditSession = Boolean(id);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const onHandleSubmit = (data) => {
    if (!isEditSession) {
      create(data);
    } else {
      edit({ newData: data, id });
    }
  };

  if (isPending || editIsPending) return <Spinner />;

  return (
    <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid>
        <Input directions='column' label='First name' register={register} {...register("first_name")} />
        <Input directions='column' label='Last name' register={register} {...register("last_name")} />
        <Input type='email' directions='column' label='Email' register={register} {...register("email")} />
        <CustomPhoneInput
          label='Mobile number'
          name='mobile_number'
          control={control}
          defaultValue={isEditSession ? addressBookToEdit?.mobile_number : ""}
        />
        <CustomPhoneInput
          label='Telefon number'
          name='phone_number'
          control={control}
          defaultValue={isEditSession ? addressBookToEdit?.phone_number : ""}
        />

        <Input directions='column' label='Country' register={register} {...register("country")} />
        <Input directions='column' label='Address' register={register} {...register("address")} />
        <Input directions='column' label='Second address' register={register} {...register("address_2")} />
        <Input directions='column' label='Company' register={register} {...register("company")} />
        <Input type='url' directions='column' label='Linkedin url' register={register} {...register("linkedin_link")} />
        <Input type='url' directions='column' label='Facebook url' register={register} {...register("facebook_link")} />
        <Input type='url' directions='column' label='Instagram url' register={register} {...register("instagram_link")} />
        <Input type='url' directions='column' label='Tik Tok url' register={register} {...register("tiktok_link")} />
      </Grid>
      <TextArea directions='column' label='Note' register={register} {...register("note")}></TextArea>
      <Row>
        {isEditSession ? (
          <Button>{editIsPending ? "Editing..." : editIsSuccess ? "Success!" : "Edit"}</Button>
        ) : (
          <Button>{isPending ? "Creating..." : isSuccess ? "Success!" : "Save"}</Button>
        )}
      </Row>
    </StyledForm>
  );
}

export default FormAddressBook;
