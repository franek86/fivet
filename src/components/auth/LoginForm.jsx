import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";

import { loginSchema } from "../../utils/validationSchema.js";
import { loginApi } from "../../services/apiAuth.js";
import { setUser } from "../../slices/authSlice.js";

import styled from "styled-components";
import { toast } from "react-toastify";

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, session: data.session }));
      toast.success("Your are loggedin");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
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
        type='email'
        directions='column'
        placehoder='Email address'
        label='Email'
        name='email'
        register={register}
        {...register("email")}
      />
      <InputErrorMessage message={errors.email?.message} />
      <Input
        directions='column'
        type='password'
        placehoder='Password'
        label='Password'
        name='password'
        register={register}
        {...register("password")}
      />
      <InputErrorMessage message={errors.password?.message} />
      <Button>{isPending ? "Loading..." : "Log in"}</Button>
    </Form>
  );
}

export default LoginForm;
