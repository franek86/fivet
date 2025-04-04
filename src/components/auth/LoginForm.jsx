import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";

import { loginSchema } from "../../utils/validationSchema.js";
import { loginApi } from "../../services/apiAuth.js";

import styled from "styled-components";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/handleApiError.js";

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

function LoginForm() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async () => {
      toast.success("Your are loggedin");
      navigate("/dashboard");
    },
    onError: (error) => {
      handleApiError(error, "Login failed");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        directions='column'
        placehoder='Email address'
        label='Email *'
        name='email'
        register={register}
        {...register("email")}
        autoComplete='email'
      />
      <InputErrorMessage message={errors.email?.message} />
      <Input
        directions='column'
        type='password'
        placehoder='Password'
        label='Password *'
        name='password'
        register={register}
        {...register("password")}
        autoComplete='password'
      />
      <InputErrorMessage message={errors.password?.message} />
      <Button data-cy='login'>{isPending ? "Loading..." : "Log in"}</Button>
    </Form>
  );
}

export default LoginForm;
