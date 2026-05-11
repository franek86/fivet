import { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  :root {
    /* LIGHT MODE (default) */
    --color-white: #fff;
    --color-grey-200: #f4f5f7;
    --color-accent: oklch(93.2% 0.032 255.585);
    --color-accent-600: oklch(78% 0.06 255.585);
    --color-border: oklch(90% 0.015 255.585);
    --color-text: #1a2238;
    --color-text-muted: #6b7280;
    --color-success: #16a34a;
    --color-danger: #dc2626;

    --backdrop-color: rgba(255, 255, 255, 0.1);
    --linear-gradient: linear-gradient(90deg, #e0e0e0 25%, #ffffff 50%, #f0f0f0 75%);

    --shadow-sm: 0 1px 3px rgba(16, 24, 40, 0.04), 0 1px 2px rgba(16, 24, 40, 0.03);
    --shadow-md: 0px 1rem 2.8rem rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --image-grayscale: 0;
    --image-opacity: 100%;

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --toastify-font-family: "Inter", serif;

    --device-sm: 640px; /* 640px */
    --device-md: 48rem; /* 768px */
    --device-lg: 64rem; /* 1024px */
    --device-xl: 80rem; /* 1280px */
    --device-xxl: 96rem; /* 1536px */
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

  /* DARK MODE */
  body.dark-mode {
    --color-white: #18212f;
    --color-grey-200: oklch(18% 0.01 255.585);
    --color-accent: oklch(42% 0.08 255.585);
    --color-accent-600: oklch(55% 0.11 255.585);
    --color-border: oklch(30% 0.02 255.585);
    --color-text: #f3f4f6;
    --color-text-muted: #9ca3af;
    --color-success: #22c55e;
    --color-danger: #ef4444;

    --backdrop-color: rgba(0, 0, 0, 0.3);
    --linear-gradient: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Inter", serif;
    font-size: 14px;
    color: var(--color-text);
    background-color: var(--color-grey-200);

    transition:
      color 0.3s,
      background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
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
    color: var(--color-text-muted);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-accent-600);
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
  .image-input {
    display: none;
  }

  img {
    max-width: 100%;

    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }
  tr:nth-child(even) {
    background-color: var(--color-grey-200);
  }
  tr:nth-child(odd) {
    background-color: var(--color-white);
  }

  .input-icon {
    color: var(--color-text);
  }

  /* Title and search container */
  .search-container {
    display: grid;
    gap: 1rem;
    margin-bottom: 24px;

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

  /* card */
  .card-container {
    padding: 20px;
    border: 1px solid var(--color-border);
    background-color: var(--color-white);
    border-radius: var(--border-radius-lg);
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  /* Simmer animation */
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

  /* React date time */
  .react-datepicker__input-container input {
    padding: 1.25rem 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    min-width: 100%;
    background-color: var(--color-white);

    &::placeholder {
      color: var(--color-text);
    }
  }

  .react-datepicker-popper {
    z-index: 10;
  }

  .custom-calendar {
    /* min-width: 350px !important; */
    font-size: 1.4rem;
    border: none;
    background-color: var(--color-white);
    box-shadow: var(--shadow-lg);
  }

  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
    fill: var(--color-accent);
    color: var(--color-accent-600);
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: var(--color-accent-600);
    color: var(--color-white);
  }

  .react-datepicker__day--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__quarter-text--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text--keyboard-selected:not([aria-disabled="true"]):hover {
    background-color: var(--color-accent-600);
  }
  .custom-calendar .react-datepicker__header {
    padding: 20px 0;
    background: var(--color-accent);
    border: none;
  }

  .custom-calendar .react-datepicker__current-month,
  .custom-calendar .react-datepicker-time__header,
  .custom-calendar .react-datepicker-year-header {
    font-size: 14px;
    color: var(--color-text);
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
    background-color: var(--color-text);
    color: var(--color-white);
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
    top: 14px;
    outline: none;
  }

  .custom-calendar .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 100px;
  }

  .custom-calendar .react-datepicker__navigation-icon::before,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    border-color: var(--color-text);
  }

  /* Range react */
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
    background-color: var(--color-accent-600);
    border-radius: 50%;
  }

  /* React Tostify */
  .Toastify__toast {
    font-size: 1.2rem;
  }

  /* REACT TELEPHONE INPUT STYLE */
  .react-tel-input .form-control {
    border: 1px solid var(--color-border);
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
    background-color: var(--color-white);
    box-shadow: var(--shadow-lg);
  }

  .rdtPicker td.rdtDay:hover,
  .rdtPicker .rdtTimeToggle,
  .rdtPicker thead tr:first-of-type th {
    background-color: var(--color-accent-600);
    color: var(--color-white);
  }

  .rdtPicker thead tr:first-of-type th:hover {
    background: var(--color-accent);
    color: var(--color-text);
  }

  .rdtPicker .rdtDays .dow {
    color: var(--color-text-muted);
  }

  .rdtPicker .rdtDays td span {
    border-radius: 50%;
    cursor: pointer;
  }

  .rdtPicker .rdtDays td span:hover {
    background-color: var(--color-accent-600);
    color: var(--color-white);
  }

  .rdtPicker .rdtActive {
    background-color: var(--color-accent-600) !important;
    color: var(--color-white);
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
    background-color: var(--color-accent-600);
    color: var(--color-white);
  }

  /* Input field */
  .rdt input {
    border: 1px solid var(--color-border);
    border-radius: 5px;
    padding: 1.25rem 0.9rem;
    width: 100%;
  }

  .rdt input:focus {
    border-color: var(--color-accent-600);
    outline: none;
    box-shadow: var(--shadow-md);
  }

  /* React range calendar */
  .rbc-off-range-bg {
    background: var(--color-grey-200);
  }

  /* text editor */
  .text-editor-custom {
    min-height: 150px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-white);
    padding: 1rem;
    overflow: scroll;

    ul {
      list-style: disc;
    }

    ol,
    ul {
      margin-left: 2rem;
    }
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
