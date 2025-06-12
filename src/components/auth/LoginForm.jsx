import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import { FiEyeOff, FiEye } from "react-icons/fi";

import { loginSchema } from "../../utils/validationSchema.js";
import { loginApi } from "../../services/apiAuth.js";

import styled from "styled-components";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/handleApiError.js";
import { useState } from "react";

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const PasswordWrap = styled.div`
  position: relative;
`;

const PasswordIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 4rem;
  cursor: pointer;
`;

const RemberMeWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remeberMe, setRemeberMe] = useState(false);

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
        placeholder='Email address'
        label='Email *'
        name='email'
        register={register}
        {...register("email")}
        autoComplete='email'
      />
      <InputErrorMessage message={errors.email?.message} />
      <PasswordWrap>
        <Input
          directions='column'
          type={showPassword ? "text" : "password"}
          placeholder='Password'
          label='Password *'
          name='password'
          register={register}
          {...register("password")}
          autoComplete='password'
        />
        <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
        </PasswordIcon>
      </PasswordWrap>

      <InputErrorMessage message={errors.password?.message} />

      <RemberMeWrap>
        <Checkbox checked={remeberMe} onChange={() => setRemeberMe(!remeberMe)} />
        <p>Remember me</p>
      </RemberMeWrap>

      <Link to='/forgot-password'>Forgot password?</Link>

      <Button data-cy='login'>{isPending ? "Loading..." : "Log in"}</Button>
    </Form>
  );
}

export default LoginForm;
