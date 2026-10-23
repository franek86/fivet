/**
 * React & Hooks
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

/**
 * Third-party libraries
 */

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

/**
 * Features
 */
import { registerUser, verifyOtpApi } from "../../services/apiAuth.js";

import { countriesJson } from "../../utils/countriesJson.js";

/**
 * UI Components
 */
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import Title from "../ui/Title.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import RolesSection from "./RolesSection.jsx";

function SignUpForm() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userData, setUserData] = useState(null);
  const [step, setStep] = useState(1);

  const inputRefs = useRef([]);
  const intervalRef = useRef(null);

  const navigate = useNavigate();

  const startResendTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(60);
    setResend(false);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, formData) => {
      setUserData(formData);
      setShowOtp(true);
      setOtp(["", "", "", "", "", ""]);
      startResendTimer();
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Register failed. Please try again.";
      toast.error(message);
    },
  });

  const { mutate: verifyOtpMutation, isPending: verifyOtpPending } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      toast.success("OTP verified successfully");
      navigate(`/`);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "OTP failed. Please try again.";
      toast.error(message);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      role: "",
      fullName: "",
      email: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      companyName: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onHandleSubmit = (data) => {
    signUp({ ...data });
  };

  const onHandleVerifyOtp = () => {
    const { repeatPassword, ...safeUserData } = userData;
    verifyOtpMutation({ data: safeUserData, subscription: plan, otp });
  };

  //Fill otp
  const fillOtp = (digits) => {
    const clean = digits.replace(/\D/g, "").slice(0, 6);
    if (!clean) return;
    const next = ["", "", "", "", "", ""];
    clean.split("").forEach((d, i) => (next[i] = d));
    setOtp(next);
    inputRefs.current[Math.min(clean.length, 6) - 1]?.focus();
  };

  // Handle otp change
  const handleOtpChange = (index, value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length > 1) return fillOtp(digits);
    //if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = digits;
    setOtp(newOtp);
    //if (digits && index < 5) inputRefs.current[index + 1]?.focus();

    if (digits && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  //handle Paste otp
  const handleOtpPaste = (e) => {
    e.preventDefault();
    fillOtp(e.clipboardData.getData("text"));
  };

  //Handle otp key press
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // focus first box when OTP screen appears
  useEffect(() => {
    if (showOtp) inputRefs.current[0]?.focus();
  }, [showOtp]);

  //Resend otp
  const resendOtp = () => {
    if (!userData || isPending) return;
    signUp(userData);
  };

  const nextStep = async () => {
    let fields = [];

    if (step === 1) {
      fields = ["role"];
    }

    if (step === 2) {
      fields = ["fullName", "email", "password", "repeatPassword"];
    }

    if (step === 3) {
      fields = ["address", "zipCode", "city", "country"];
    }

    const isValid = await trigger(fields);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      {!showOtp ? (
        <FormWrapper onSubmit={handleSubmit(onHandleSubmit)}>
          {/* Step indicators */}
          <StepIndicator>
            <StepItem>
              <StepCircle $active={step >= 1}>1</StepCircle>
              <span>Role</span>
              <StepLine />
            </StepItem>

            <StepItem>
              <StepCircle $active={step >= 2}>2</StepCircle>
              <span>Account</span>
              <StepLine />
            </StepItem>

            <StepItem>
              <StepCircle $active={step >= 3}>3</StepCircle>
              <span>Company info</span>
            </StepItem>
          </StepIndicator>

          {/* Step 1 */}
          {step === 1 && (
            <FormContainer>
              <input
                type='hidden'
                {...register("role", {
                  required: "Please select a role",
                })}
              />
              <RolesSection
                value={watch("role")}
                onChange={(role) =>
                  setValue("role", role, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />

              <InputErrorMessage message={errors.role?.message} />

              <Row>
                <Button type='button' onClick={nextStep}>
                  Continue
                </Button>
              </Row>
            </FormContainer>
          )}

          {/* Step two */}
          {step === 2 && (
            <FormContainer>
              <Column>
                <Input
                  directions='column'
                  label='Full name *'
                  placeholder='Enter full name'
                  register={register}
                  {...register("fullName", { required: "Full name is required" })}
                  autoComplete='name'
                />

                <InputErrorMessage message={errors.fullName?.message} />
              </Column>
              <Column>
                <Input
                  directions='column'
                  label='Business email *'
                  placeholder='Enter your email'
                  register={register}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  autoComplete='email'
                />
                <InputErrorMessage message={errors.email?.message} />
              </Column>

              <Column>
                <PasswordWrap>
                  <Input
                    directions='column'
                    label='Password *'
                    placeholder='Enter your password'
                    type={showPassword ? "text" : "password"}
                    register={register}
                    {...register("password", {
                      required: "Password is requierd",
                      minLength: { value: 8, message: "Minimun 8 characters" },
                    })}
                    autoComplete='new-password'
                  />

                  <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className='input-icon' size={18} /> : <Eye className='input-icon' size={18} />}
                  </PasswordIcon>
                </PasswordWrap>
                <InputErrorMessage message={errors.password?.message} />
              </Column>
              <Column>
                <Input
                  directions='column'
                  type='password'
                  label='Repeat password *'
                  placeholder='Repeat your password'
                  register={register}
                  {...register("repeatPassword", {
                    required: "Please repeat password",
                    validate: (value) => value === watch("password") || "Passowords does not match",
                  })}
                  autoComplete='new-password'
                />
                <InputErrorMessage message={errors.repeatPassword?.message} />
              </Column>

              <Row>
                <Button type='button' onClick={prevStep}>
                  Back
                </Button>
                <Button type='button' onClick={nextStep}>
                  Continue
                </Button>
              </Row>
            </FormContainer>
          )}
          {/* Step two */}
          {step === 3 && (
            <FormContainer>
              <Column>
                <Input
                  directions='column'
                  label='Company name *'
                  placeholder='e.g. Company name Ltd'
                  register={register}
                  {...register("companyName", { required: "Company name required" })}
                />
                <InputErrorMessage message={errors.companyName?.message} />
              </Column>

              <Column>
                <Input
                  directions='column'
                  label='Company registration number'
                  placeholder='Enter company register number'
                  register={register}
                  {...register("companyRegistrationNumber")}
                />
              </Column>

              <Column>
                <Input
                  directions='column'
                  label='City *'
                  placeholder='Enter City'
                  register={register}
                  {...register("city", { required: "City required" })}
                />

                <InputErrorMessage message={errors.city?.message} />
              </Column>
              <Column>
                <Controller
                  name='country'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      control={control}
                      options={countriesJson}
                      placeholder='Enter country'
                      label='Country *'
                      size='medium'
                      variation='transparent'
                      {...register("country", { required: "Country is required" })}
                    />
                  )}
                />

                <InputErrorMessage message={errors.country?.message} />
              </Column>

              <Column>
                <Input directions='column' label='Address' placeholder='Enter address' register={register} {...register("address")} />
              </Column>
              <Column>
                <Input
                  directions='column'
                  label='Postal code'
                  placeholder='Enter postal code'
                  register={register}
                  {...register("zipCode")}
                />
              </Column>

              {/*  <Column>
                <TextArea
                  directions='column'
                  label='Company description'
                  name='companyDescription'
                  register={register}
                  {...register("companyDescription'")}
                />
              </Column> */}

              <Row>
                <Button type='button' onClick={prevStep}>
                  Back
                </Button>
              </Row>

              <p>Siging up I accept Fivet Terms and Conditions and I read Fivet Privacy Policy</p>
              <Button type='submit' disabled={isPending}>
                {isPending ? "Loading..." : "Sign up"}
              </Button>
            </FormContainer>
          )}
        </FormWrapper>
      ) : (
        <>
          <Title tag='h4'>Enter OTP</Title>
          <ShowOtpWrapper>
            {otp?.map((digit, index) => (
              <OtpInput
                key={index}
                type='text'
                inputMode='numeric'
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={index === 0 ? 6 : 1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handleOtpPaste}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
              />
            ))}
          </ShowOtpWrapper>

          <Button disabled={verifyOtpPending || otp.join("").length < 6} onClick={onHandleVerifyOtp}>
            {verifyOtpPending ? "Loading..." : "Verify OTP"}
          </Button>
          <>
            {resend ? (
              <ResendOtp onClick={resendOtp} disabled={isPending}>
                {isPending ? "Sending..." : "Resend OTP"}
              </ResendOtp>
            ) : (
              `Resend OTP in ${timer}`
            )}
          </>
        </>
      )}
    </>
  );
}

export default SignUpForm;

const FormWrapper = styled.form`
  display: grid;
  p {
    font-size: 12px;
    color: var(--color-text);
    margin: 10px 0;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media screen and (min-width: 640px) {
    gap: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const ShowOtpWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const OtpInput = styled.input`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  text-align: center;
  font-size: 2rem;
`;

const ResendOtp = styled.p`
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  &:hover {
    color: var(--color-text-muted);
  }
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const StepItem = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  span {
    display: flex;
  }
`;

const StepCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-border)")};

  color: ${({ $active }) => ($active ? "var(--color-white)" : "var(--color-text)")};
  z-index: 2;
`;

const StepLine = styled.div`
  position: absolute;
  top: 18px;
  left: 50%;

  width: 100%;
  height: 2px;

  z-index: 1;

  background: var(--color-border);
`;
