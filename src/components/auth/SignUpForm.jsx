import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";

import styled from "styled-components";
import { toast } from "react-toastify";

import { signupEmailApi } from "../../services/apiAuth.js";
import { useCreateProfile } from "../../hooks/useProfile.js";
import { useNavigate } from "react-router";
import { useCreateUserRole } from "../../hooks/useAuth.js";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Column = styled(Form)`
  margin-bottom: 2rem;
`;

function SignUpForm() {
  const navigate = useNavigate();

  const { mutate: signUp } = useMutation({
    mutationFn: signupEmailApi,
    onSuccess: () => {
      toast.success("Sign in!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createProfile } = useCreateProfile();
  const { mutate: createUserRole } = useCreateUserRole();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onHandleSubmit = ({ fullName, email, password }) => {
    signUp(
      { fullName, email, password },
      {
        onSuccess: ({ user }) => {
          createProfile({
            fullName: user.user_metadata.fullName,
            email: user.user_metadata.email,
            id: user.id,
          });

          createUserRole({
            user_id: user.id,
          });
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <Column>
        <Input
          directions='column'
          label='Full name *'
          register={register}
          {...register("fullName", { required: "Full name is required" })}
          autoComplete='fullName'
        />
        <InputErrorMessage message={errors.fullName?.message} />
      </Column>
      <Column>
        <Input
          directions='column'
          label='Email *'
          register={register}
          {...register("email", { required: "Email is required" })}
          autoComplete='email'
        />
        <InputErrorMessage message={errors.email?.message} />
      </Column>
      <Column>
        <Input
          directions='column'
          label='Password *'
          type='password'
          register={register}
          {...register("password", {
            required: "Password is requierd",
            minLength: { value: 8, message: "Minimun 8 characters" },
          })}
          autoComplete='password'
        />
        <InputErrorMessage message={errors.password?.message} />
      </Column>
      <Column>
        <Input
          directions='column'
          type='password'
          label='Repeat password *'
          register={register}
          {...register("repeatPassword", {
            required: "Please repeat password",
            validate: (value) => value === watch("password") || "Passowords does not match",
          })}
          autoComplete='repeatPassword'
        />
        <InputErrorMessage message={errors.repeatPassword?.message} />
      </Column>
      <Button>Register</Button>
    </Form>
  );
}

export default SignUpForm;
