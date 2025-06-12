import { forwardRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import PhoneInput from "react-phone-input-2";

const CustomPhoneInput = forwardRef(({ control, name, label, defaultValue }, ref) => {
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    fetch("http://ip-api.com/json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.countryCode) {
          setCountryCode(data.countryCode.toLocaleLowerCase());
        }
      })
      .catch((error) => console.log("Error fetching location:", error));
  }, []);
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            inputRef={ref}
            specialLabel={label}
            country={defaultValue || countryCode}
            onChange={(value) => field.onChange(value)}
            value={defaultValue}
          />
        )}
      />
    </>
  );
});

export default CustomPhoneInput;
