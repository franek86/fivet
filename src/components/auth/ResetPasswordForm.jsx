import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";

import styled from "styled-components";
import { resetPasswordApi } from "../../services/apiAuth.js";

import { FiEyeOff, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Column = styled(Form)`
  margin-bottom: 2rem;
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

function ResetPasswordForm({ email }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password successfully reset.");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmitPassword = ({ password }) => {
    mutate({ email, password });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmitPassword)}>
      <Column>
        <PasswordWrap>
          <Input
            directions='column'
            label='Enter new password *'
            type={showPassword ? "text" : "password"}
            register={register}
            {...register("password", {
              required: "New password is requierd",
              minLength: { value: 8, message: "Minimun 8 characters" },
            })}
            autoComplete='password'
          />
          <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </PasswordIcon>
        </PasswordWrap>
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
      <Button>{isPending ? "Reseting..." : "Reset"}</Button>
    </Form>
  );
}

export default ResetPasswordForm;
