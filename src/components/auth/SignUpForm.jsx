/**
 * React & Hooks
 */
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

/**
 * Third-party libraries
 */
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

/**
 * Features
 */
import { registerUser, verifyOtpApi } from "../../services/apiAuth.js";
import { setUser } from "../../slices/authSlice.js";
import { countriesJson } from "../../utils/countriesJson.js";

/**
 * UI Components
 */
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import TextArea from "../ui/TextArea.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import Title from "../ui/Title.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StepCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-border)")};

  color: ${({ $active }) => ($active ? "var(--color-text)" : "var(--color-text)")};
`;

const StepLine = styled.div`
  width: 70px;
  height: 1px;
  background: var(--color-border);
`;

function SignUpForm() {
  const roles = ["BROKER", "SELLER", "BUYER"];
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userData, setUserData] = useState(null);
  const inputRefs = useRef([]);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, formData) => {
      setUserData(formData);
      dispatch(
        setUser({
          formData,
          subscription: plan,
        }),
      );
      setShowOtp(true);
      setResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyOtpMutation, isPending: verifyOtpPending } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      toast.success("OTP verified successfully");
      navigate(`/billing`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
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

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    if (userData) {
      signUp(userData);
    }
  };

  const nextStep = async () => {
    let fields = [];

    if (step === 1) {
      fields = ["fullName", "email", "password", "repeatPassword"];
    }

    if (step === 2) {
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
              <span>Account</span>
            </StepItem>

            <StepLine />

            <StepItem>
              <StepCircle $active={step >= 2}>2</StepCircle>
              <span>Company info</span>
            </StepItem>

            <StepLine />

            <StepItem>
              <StepCircle $active={step >= 3}>3</StepCircle>
              <span>Choose your role</span>
            </StepItem>
          </StepIndicator>

          {/* Step one */}
          {step === 1 && (
            <FormContainer>
              <Column>
                <Input
                  directions='column'
                  label='Full name *'
                  placeholder='Enter full name'
                  register={register}
                  {...register("fullName", { required: "Full name is required" })}
                  autoComplete='fullName'
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
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                    autoComplete='password'
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
                  autoComplete='repeatPassword'
                />
                <InputErrorMessage message={errors.repeatPassword?.message} />
              </Column>

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
                  label='Company name *'
                  placeholder='e.g. Company name Ltd'
                  register={register}
                  {...register("companyName", { required: "Company name required" })}
                />
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

              <Column>
                <Input
                  directions='column'
                  label='Business web'
                  placeholder='Enter business web'
                  register={register}
                  {...register("businessWeb")}
                />
              </Column>

              <Column>
                <Input
                  directions='column'
                  label='Business email'
                  placeholder='Enter business email'
                  register={register}
                  {...register("businessEmail")}
                />
              </Column>

              <Column>
                <Input
                  directions='column'
                  label='Business phone'
                  placeholder='Enter business phone'
                  register={register}
                  {...register("businessPhone")}
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
                <Button type='button' onClick={nextStep}>
                  Continue
                </Button>
              </Row>
            </FormContainer>
          )}
          {/* Step three */}
          {step === 3 && (
            <>
              <p>Siging up I accept Fivet Terms and Conditions and I read Fivet Privacy Policy</p>
              <Button type='submit' disabled={isPending}>
                {isPending ? "Signing up ..." : "Sign up"}
              </Button>

              <Button type='button' onClick={prevStep}>
                Back
              </Button>
            </>
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
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
              />
            ))}
          </ShowOtpWrapper>
          <Button disabled={verifyOtpPending} onClick={onHandleVerifyOtp}>
            {verifyOtpPending ? "Verifing..." : "Verify OTP"}
          </Button>
          <>{resend ? <ResendOtp onClick={resendOtp}>Resend OTP</ResendOtp> : `Resend OTP in ${timer}`}</>
        </>
      )}
    </>
  );
}

export default SignUpForm;
