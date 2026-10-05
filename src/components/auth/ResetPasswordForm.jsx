/**
 * React & Hooks
 */
import { useState } from "react";

/**
 * Third-party libraries
 */
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";

/**
 * Features - api,redux slices
 */
import { resetPasswordApi } from "../../services/apiAuth.js";

/**
 * UI Components
 */
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import { useSelector } from "react-redux";

function ResetPasswordForm() {
  const resetToken = useSelector((state) => state.auth.resetToken);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password successfully reset.");
      navigate("/");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Reset password failed. Please try again.";
      toast.error(message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmitPassword = ({ password }) => {
    mutate({ resetToken, password });
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
            {showPassword ? <EyeClosed size={22} /> : <Eye size={22} />}
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
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
