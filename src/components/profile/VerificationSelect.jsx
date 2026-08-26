import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Spinner from "../Spinner.jsx";
import { CheckIcon } from "lucide-react";

const VERIFICATION_STATUSES = ["PENDING", "VERIFIED", "REJECTED", "SUSPENDED"];

const VerificationSelect = ({ value = "PENDING", onChange, isLoading = false }) => {
  const [valueStatus, setValueStatus] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setValueStatus(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (status) => {
    setValueStatus(status);
    setIsOpen(false);
    onChange(status);
  };

  return (
    <Wrapper ref={dropdownRef}>
      <SelectWrapper
        $status={valueStatus}
        $disabled={isLoading}
        onClick={() => {
          if (!isLoading) {
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <StatusDot $status={valueStatus} />
        <CurrentValue>{valueStatus}</CurrentValue>
      </SelectWrapper>

      {isLoading && <Spinner />}
      {isOpen && !isLoading && (
        <Dropdown>
          {VERIFICATION_STATUSES.map((status) => (
            <DropdownItem key={status} $active={status === valueStatus} onClick={() => handleSelect(status)}>
              <StatusDot $status={status} />

              <div>{status}</div>

              {status === valueStatus && <CheckIcon size={14} />}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 140px;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  padding: 0 32px 0 27px;

  background-color: ${({ $status }) => {
    switch ($status) {
      case "VERIFIED":
        return "var(--color-success)";

      case "REJECTED":
        return "var(--color-danger)";

      case "SUSPENDED":
        return "var(--color-warning)";

      default:
        return "var(--color-accent)";
    }
  }};

  border-radius: var(--border-radius-md);
  color: ${({ $status }) => {
    switch ($status) {
      case "VERIFIED":
        return "var(--color-white)";

      case "REJECTED":
        return "var(--color-white)";

      default:
        return "var(--color-text)";
    }
  }};
  font-size: 12px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "wait" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  user-select: none;

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    box-shadow: ${({ $disabled }) => ($disabled ? "none" : "var(--shadow-md)")};
  }
`;

const CurrentValue = styled.span`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusDot = styled.div`
  position: absolute;
  left: 10px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $status }) => {
    switch ($status) {
      case "VERIFIED":
        return "var(--color-success-600)";

      case "REJECTED":
        return "var(--color-danger-600)";

      case "SUSPENDED":
        return "var(--color-warning-600)";

      case "PENDING":
      default:
        return "var(--color-accent-600)";
    }
  }};

  pointer-events: none;
`;

const Arrow = styled.span`
  position: absolute;
  right: 9px;

  display: flex;
  align-items: center;

  color: currentColor;

  pointer-events: none;
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 100;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
  animation: dropdownIn 0.12s ease-out;
  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 36px;
  padding: 0 9px;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "var(--color-accent)" : "transparent")};
  color: var(--color-text);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: var(--color-accent-600);
  }
  ${StatusDot} {
    margin-right: 8px;
    position: static;
  }
`;

export default VerificationSelect;
