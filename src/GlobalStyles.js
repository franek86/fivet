import { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";

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
      --color-indigo-100: oklch(93% 0.034 272.788);
      --color-indigo-400: oklch(78.5% 0.115 274.713);
      --color-indigo-600: oklch(58.5% 0.233 277.117);
      --color-indigo-700: oklch(51.1% 0.262 276.966);

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(255, 255, 255, 0.1);
      --linear-gradient: linear-gradient(90deg, #e0e0e0 25%, #ffffff 50%, #f0f0f0 75%);
      --bg-linear-gradient: linear-gradient(to right, oklch(54.6% 0.245 262.881), oklch(62.7% 0.265 303.9));
      --bg-linear-gradient-soft: linear-gradient(to right, oklch(80.9% 0.105 251.813), oklch(82.7% 0.119 306.383));

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.07);
      --shadow-md: 0px 1rem 2.8rem rgba(0, 0, 0, 0.1);
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

    /* Color brand */
    --color-brand-50: oklch(97% 0.014 254.604);
    --color-brand-100: oklch(93.2% 0.032 255.585);
    --color-brand-200: oklch(88.2% 0.059 254.128);
    --color-brand-400: oklch(80.9% 0.105 251.813);
    --color-brand-500: oklch(62.3% 0.214 259.815);
    --color-brand-600: oklch(54.6% 0.245 262.881);
    --color-brand-700: oklch(48.8% 0.243 264.376);
    --color-brand-800: oklch(42.4% 0.199 265.638);
    --color-brand-900: oklch(37.9% 0.146 265.522);

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --toastify-font-family: "Urbanist", serif;

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
    transition:
      background-color 0.3s,
      border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Urbanist", serif;
    color: var(--color-grey-700);
    background-color: var(--color-grey-100);

    transition:
      color 0.3s,
      background-color 0.3s;
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

  .input-icon {
    color: var(--color-grey-400);
  }

  //Title and search container
  .search-container {
    display: grid;
    gap: 1rem;

    @media screen and (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .search-container-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3rem;
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

  //React date time
  .react-datepicker__input-container input {
    padding: 1.25rem 0.9rem;
    border: 1px solid var(--color-grey-500);
    border-radius: var(--border-radius-sm);
    min-width: 100%;
  }

  .react-datepicker-popper {
    z-index: 10;
  }

  .custom-calendar {
    //min-width: 350px !important;
    font-size: 1.4rem;
    border: none;
    background-color: var(--color-grey-50);
    box-shadow: var(--shadow-lg);
  }

  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
    fill: oklch(62.7% 0.265 303.9);
    color: oklch(54.6% 0.245 262.881);
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: oklch(62.7% 0.265 303.9);
    color: var(--color-grey-0);
  }

  .react-datepicker__day--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__quarter-text--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text--keyboard-selected:not([aria-disabled="true"]):hover {
    background-color: oklch(54.6% 0.245 262.881);
  }
  .custom-calendar .react-datepicker__header {
    padding: 10px 0;
    font-size: 1.2rem;
    background: var(--bg-linear-gradient);
  }

  .custom-calendar .react-datepicker__current-month,
  .custom-calendar .react-datepicker-time__header,
  .custom-calendar .react-datepicker-year-header {
    font-size: 1.3rem;
    color: var(--color-grey-0);
    font-weight: 600;
  }
  .custom-calendar .react-datepicker__day-name,
  .custom-calendar .react-datepicker__day {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 1.2rem;
  }

  .custom-calendar .react-datepicker__time-container {
    width: 100px;
  }

  .custom-calendar .react-datepicker__time-box {
    font-size: 1.2rem;
  }

  .custom-calendar .react-datepicker__time-list-item {
    height: 40px;
    line-height: 10px;
    font-size: 1.2rem;
  }

  .custom-calendar
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected,
  .custom-calendar .react-datepicker__day--selected {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
  }

  .custom-calendar
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    padding: 10px 10px;
  }

  .custom-calendar .react-datepicker__navigation {
    top: 4px;
    outline: none;
  }

  .custom-calendar .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 100px;
  }

  .custom-calendar .react-datepicker__navigation-icon::before,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    border-color: var(--color-grey-0);
  }

  // Range react
  .range-wrapper {
    position: relative;
    height: 6px;
    border-radius: 5px;
    margin-top: 1.3rem;
  }

  .range {
    position: absolute;
    height: 100%;
  }

  .range-thumb {
    width: 16px;
    height: 16px;
    background-color: var(--color-brand-600);
    border-radius: 50%;
  }

  //React Tostify
  .Toastify__toast {
    font-size: 1.2rem;
  }

  /* REACT TELEPHONE INPUT STYLE */
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

  /* DATEPICKER STYLE */
  .rdtPicker {
    border-radius: var(--border-radius-md);
    padding: 10px;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-lg);
  }

  .rdtPicker td.rdtDay:hover,
  .rdtPicker .rdtTimeToggle,
  .rdtPicker thead tr:first-of-type th {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
  }

  .rdtPicker thead tr:first-of-type th:hover {
    background: var(--color-brand-200);
    color: var(--color-grey-700);
  }

  .rdtPicker .rdtDays .dow {
    color: var(--color-grey-500);
  }

  .rdtPicker .rdtDays td span {
    border-radius: 50%;
    cursor: pointer;
  }

  .rdtPicker .rdtDays td span:hover {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
  }

  .rdtPicker .rdtActive {
    background-color: var(--color-brand-500) !important;
    color: var(--color-grey-0);
    border-radius: 50%;
  }

  .rdtPicker .rdtDisabled {
    color: #ccc !important;
    cursor: not-allowed;
  }

  .rdtPicker .rdtTime td span {
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
  }

  .rdtPicker .rdtTime td span:hover {
    background-color: #007bff;
    color: #fff;
  }

  /* Input field */
  .rdt input {
    border: 1px solid var(--color-grey-500);
    border-radius: 5px;
    padding: 1.25rem 0.9rem;
    width: 100%;
  }

  .rdt input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  /* ANIMATION KEYFRAME */
  @keyframes shimmer-animation {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  /* RESPONSIVE > 640px  */
  @media screen and (max-width: 640px) {
    .hidden-table-sm {
      display: none;
    }
  }

  .table-td {
    display: none;
    @media screen and (min-width: 640px) {
      display: table-cell;
    }
  }
`;

export default GlobalStyles;
