import { createGlobalStyle } from "styled-components";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-phone-input-2/lib/style.css";
import "react-quill/dist/quill.snow.css";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  :root {
    &,
    &.light-mode {
      /* Grey */
      --color-grey-0: #fff;
      --color-grey-50: #f9fafb;
      --color-grey-100: #f3f4f6;
      --color-grey-200: #e5e7eb;
      --color-grey-300: #d1d5db;
      --color-grey-400: #9ca3af;
      --color-grey-500: #6b7280;
      --color-grey-600: #4b5563;
      --color-grey-700: #374151;
      --color-grey-800: #1f2937;
      --color-grey-900: #111827;

      --color-blue-100: #e0f2fe;
      --color-blue-500: #0ea5e9;
      --color-blue-700: #0369a1;
      --color-green-100: #dcfce7;
      --color-green-200: #99f6e4;
      --color-green-700: #15803d;
      --color-yellow-100: #fef9c3;
      --color-yellow-700: #a16207;
      --color-silver-100: #e5e7eb;
      --color-silver-700: #374151;
      --color-indigo-100: #e0e7ff;
      --color-indigo-700: #4338ca;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(255, 255, 255, 0.1);
      --linear-gradient: linear-gradient(90deg, #e0e0e0 25%, #ffffff 50%, #f0f0f0 75%);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

      --image-grayscale: 0;
      --image-opacity: 100%;
    }

    &.dark-mode {
      --color-grey-0: #18212f;
      --color-grey-50: #111827;
      --color-grey-100: #1f2937;
      --color-grey-200: #374151;
      --color-grey-300: #4b5563;
      --color-grey-400: #6b7280;
      --color-grey-500: #9ca3af;
      --color-grey-600: #d1d5db;
      --color-grey-700: #e5e7eb;
      --color-grey-800: #f3f4f6;
      --color-grey-900: #f9fafb;

      --color-blue-100: #075985;
      --color-blue-700: #e0f2fe;
      --color-green-100: #166534;
      --color-green-700: #dcfce7;
      --color-yellow-100: #854d0e;
      --color-yellow-700: #fef9c3;
      --color-silver-100: #374151;
      --color-silver-700: #f3f4f6;
      --color-indigo-100: #3730a3;
      --color-indigo-700: #e0e7ff;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(0, 0, 0, 0.3);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

      --image-grayscale: 10%;
      --image-opacity: 90%;
    }

    /* Indigo */
    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81;

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --toastify-font-family: "PT Sans", serif;

    //responsive brakepoints
    --device-sm: 640px; //640px
    --device-md: 48rem; //768px
    --device-lg: 64rem; //1024px
    --device-xl: 80rem; //1280px
    --device-xxl: 96rem; //1536px
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "PT Sans", serif;
    color: var(--color-grey-700);

    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  /* Hide number input arrows for Chrome, Safari, Edge, Opera */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide arrows for Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;

    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }
  tr:nth-child(even) {
    background-color: var(--color-grey-50);
  }
  tr:nth-child(odd) {
    background-color: var(--color-grey-100);
  }
  //Simmer animation
  .simmer {
    background: var(--linear-gradient);
    background-size: 400% 100%;
    animation: shimmer-animation 1.35s infinite ease-in-out;
    margin-bottom: 1rem;
  }
  .simmer-data-placeholder {
    display: inline-block;
    width: 100%;
    height: 16px;
    padding: 1.35rem 0.5rem;
  }

  //React date picker
  .react-datetime-picker__calendar--open,
  .react-datetime-picker__calendar--closed,
  .react-datetime-picker__clock--open,
  .react-datetime-picker__clock--closed {
    position: absolute;
  }
  .react-date-picker {
    &__wrapper {
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--color-grey-500);
      padding: 0.9rem;

      input:focus {
        outline: none;
      }
    }
  }

  .react-calendar {
    box-shadow: var(--shadow-lg);
    border-radius: var(--border-radius-sm);
    &__navigation button:enabled:hover,
    &__navigation button:enabled:focus,
    &__tile:enabled:hover,
    &__tile:enabled:focus {
      background-color: var(--color-brand-500);
      color: var(--color-grey-0);
      border-radius: var(--border-radius-sm);
    }
    &__tile--now {
      background-color: var(--color-brand-200);
      border-radius: var(--border-radius-sm);
    }

    &__tile--active {
      background-color: var(--color-brand-600);
      font-weight: 700;
      border-radius: var(--border-radius-sm);
    }
  }

  //React Tostify
  .Toastify__toast {
    font-size: 1.2rem;
  }

  // Custom phone input
  .react-tel-input .form-control {
    border: 1px solid var(--color-grey-500);
    border-radius: var(--border-radius-sm);
    min-width: 100%;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  .react-tel-input .special-label {
    display: block;
    position: static;
    font-size: 1.4rem;
    font-weight: 600;
    margin-right: 1rem;
    margin-bottom: 0.4rem;
  }
  .react-tel-input .flag-dropdown {
    top: 28px;
    bottom: 0;
    border: 0;
    background: transparent;
  }

  //React Quill
  .quill .ql-toolbar,
  .quill .ql-container {
    border-radius: var(--border-radius-md);
    border-color: var(--color-grey-500);
  }

  @keyframes shimmer-animation {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
`;

export default GlobalStyles;
