import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import TextArea from "../ui/TextArea.jsx";
import Spinner from "../../components/Spinner.jsx";
import CustomPhoneInput from "../ui/CustomPhoneInput.jsx";

import styled from "styled-components";
import { useCreateAddressBook, useEditAddressBook } from "../../hooks/useAddressBook.js";

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
      //create(data);
      console.log(data);
    } else {
      console.log({ newData: data, id });
      //edit({ newData: data, id });
    }
  };

  if (isPending || editIsPending) return <Spinner />;

  const priorityOptions = [
    { name: "Important", value: "IMPORTANT" },
    { name: "Regular", value: "REGULAR" },
  ];

  return (
    <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid>
        <Controller
          name='priority'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              control={control}
              name='priority'
              label='Contact priority'
              placeholder='Choose priority'
              variation='transparent'
              size='full'
              options={priorityOptions}
            />
          )}
        />
        <Input directions='column' label='Name' register={register} placeholder='Enter name' {...register("full_name")} />
        <Input type='email' directions='column' label='Email' placeholder='Enter valid email' register={register} {...register("email")} />
        <CustomPhoneInput
          label='Mobile number'
          name='mobile_number'
          control={control}
          defaultValue={isEditSession && addressBookToEdit?.mobile_number}
        />
        <CustomPhoneInput
          label='Telefon number'
          name='phone_number'
          control={control}
          defaultValue={isEditSession && addressBookToEdit?.phone_number}
        />

        <Input directions='column' label='Country' placeholder='Enter country' register={register} {...register("country")} />
        <Input directions='column' label='Address' placeholder='Enter address' register={register} {...register("address")} />
        <Input
          directions='column'
          label='Second address'
          placeholder='Enter second address'
          register={register}
          {...register("address_2")}
        />
        <Input directions='column' label='Company' placeholder='Enter company' register={register} {...register("company")} />
        <Input
          type='url'
          directions='column'
          placeholder='Enter valid linkedin url'
          label='Linkedin url'
          register={register}
          {...register("linkedin_link")}
        />
        <Input
          type='url'
          directions='column'
          label='Facebook url'
          placeholder='Enter valid facebook url'
          register={register}
          {...register("facebook_link")}
        />
        <Input
          type='url'
          directions='column'
          label='Instagram url'
          placeholder='Enter valid instagram url'
          register={register}
          {...register("instagram_link")}
        />
        <Input
          type='url'
          directions='column'
          label='Tik Tok url'
          placeholder='Enter valid tiktok url'
          register={register}
          {...register("tiktok_link")}
        />
      </Grid>
      <Controller
        name='note'
        control={control}
        render={({ field }) => <ReactQuill {...field} placeholder='Here you can enter note about your contact' />}
      />

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
