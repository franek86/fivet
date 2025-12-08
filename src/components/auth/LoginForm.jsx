import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import { toast } from "react-toastify";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";

import { loginSchema } from "../../utils/validationSchema.js";
import { loginApi } from "../../services/apiAuth.js";
import { handleApiError } from "../../utils/handleApiError.js";
import { Eye, EyeClosed } from "lucide-react";

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

const ForgotPassword = styled(Link)`
  font-size: 1.5rem;
  color: var(--color-brand-500);

  &:hover {
    color: var(--color-brand-800);
  }
`;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password, rememberMe }) => loginApi({ email, password, rememberMe }),
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
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          directions='column'
          placeholder='Enter your email'
          label='Email *'
          name='email'
          register={register}
          {...register("email")}
          autoComplete='email'
        />
        <InputErrorMessage message={errors.email?.message} />
      </div>
      <div>
        <PasswordWrap>
          <Input
            directions='column'
            type={showPassword ? "text" : "password"}
            placeholder='Enter your password'
            label='Password *'
            name='password'
            register={register}
            {...register("password")}
            autoComplete='password'
          />
          <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeClosed className='input-icon' size={20} /> : <Eye className='input-icon' size={20} />}
          </PasswordIcon>
        </PasswordWrap>

        <InputErrorMessage message={errors.password?.message} />
      </div>

      <RemberMeWrap>
        <Controller
          name='rememberMe'
          control={control}
          render={({ field }) => <ToggleSwitch checked={!!field.value} onChange={field.onChange} />}
        />
        <p>Remember me</p>
      </RemberMeWrap>

      <ForgotPassword to='/forgot-password'>Forgot password?</ForgotPassword>

      <Button $size='medium' data-cy='login'>
        {isPending ? "Loading..." : "Login"}
      </Button>
    </Form>
  );
}

export default LoginForm;
