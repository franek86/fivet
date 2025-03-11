import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input.jsx";
import TextArea from "../ui/TextArea.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import Button from "../ui/Button.jsx";

import styled from "styled-components";

import { createCategorySchema } from "../../utils/validationSchema.js";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory.js";
import { closeModalByName } from "../../slices/modalSlice.js";
import { useEditCategory } from "../../hooks/categories/useEditCategory.js";

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Column = styled(Row)`
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

function CreateCategoryForm({ categoryToEdit = {} }) {
  const dispatch = useDispatch();

  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: isEditSession ? editValues : {}, resolver: zodResolver(createCategorySchema) });

  const { mutate, isPending, isSuccess } = useCreateCategory();
  const { editMutate, editIsPending, editIsSuccess } = useEditCategory();

  const onSubmit = (data) => {
    if (isEditSession) {
      editMutate(
        { newCategory: data, id: editId },
        {
          onSuccess: () => {
            reset();
            dispatch(closeModalByName(`edit-${editId}`));
          },
        }
      );
    } else {
      mutate(data, {
        onSuccess: () => {
          reset();
          dispatch(closeModalByName("create"));
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <Input
          label='Category name'
          placeholder='e.g. See Tankers'
          directions='column'
          register={register}
          {...register("name", { require: true })}
        />
        <InputErrorMessage message={errors.name?.message} />
      </Column>
      <Column>
        <TextArea label='Description' directions='column' register={register} {...register("description")} />
      </Column>

      <Row>
        {isEditSession ? (
          <Button>{editIsPending ? "Editing..." : editIsSuccess ? "Success!" : "Edit category"}</Button>
        ) : (
          <Button>{isPending ? "Creating..." : isSuccess ? "Success!" : "Create new category"}</Button>
        )}
        {/*  <Button $variation='third'>Draft</Button>
        <Button $variation='secondary'>Cancel</Button> */}
      </Row>
    </form>
  );
}

export default CreateCategoryForm;
