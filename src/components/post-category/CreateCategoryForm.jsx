/**
 * Third-party libraries
 */
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

/**
 * Custom Hooks
 */
import { useEditCategory } from "../../hooks/categories/useEditCategory.js";
import { useCreateBlogCategory } from "../../hooks/useBlogCategory.js";

/**
 * Features
 */
import { createBlogCategorySchema } from "../../utils/validationSchema.js";
import { closeModalByName } from "../../slices/modalSlice.js";

/**
 * UI Components
 */
import Input from "../ui/Input.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import Button from "../ui/Button.jsx";

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
  } = useForm({ defaultValues: isEditSession ? editValues : {}, resolver: zodResolver(createBlogCategorySchema) });

  const { mutate, isPending, isSuccess } = useCreateBlogCategory();
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
        },
      );
    } else {
      mutate(data, {
        onSuccess: () => {
          reset();
          dispatch(closeModalByName("blog-category-create"));
        },
      });
    }
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <Input
          label='Blog Category name'
          placeholder='e.g. News'
          directions='column'
          register={register}
          {...register("title", { require: true })}
        />
        <InputErrorMessage message={errors.title?.message} />
      </Column>

      <Row>
        {isEditSession ? (
          <Button>{editIsPending ? "Editing..." : editIsSuccess ? "Success!" : "Edit category"}</Button>
        ) : (
          <Button>{isPending ? "Creating..." : isSuccess ? "Success!" : "Create new blog category"}</Button>
        )}
        {/*  <Button $variation='third'>Draft</Button>
        <Button $variation='secondary'>Cancel</Button> */}
      </Row>
    </form>
  );
}

export default CreateCategoryForm;
