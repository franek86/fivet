import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

import { useUser } from "../hooks/useAuth.js";
import { Clock, ShieldAlert, XCircle } from "lucide-react";
import { useVerificationStatus } from "../hooks/useVerificationStatus.js";

const Container = styled.div`
  background: ${({ $status }) => {
    switch ($status) {
      case "PENDING":
        return "var(--color-warning)";
      case "VERIFIED":
        return "var(--color-success)";
      case "REJECTED":
        return "var(--color-danger)";
      case "SUSPENDED":
        return "var(--color-danger)";
      default:
        return "#d1d5db";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "REJECTED":
        return "var(--color-white)";
      case "SUSPENDED":
        return "var(--color-white)";
      default:
        return "var(--color-text)";
    }
  }};
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  padding: 2rem;
  gap: 3rem;
  margin-bottom: 2rem;
`;

const STATUS_CONFIG = {
  PENDING: {
    icon: Clock,
    tone: "warning",
    title: "Your account is awaiting verification",
    body: "An admin is reviewing your submitted documents. You can browse and edit your profile, but you won't be able to add vessels or contact owners until you're verified.",
  },
  UNDER_REVIEW: {
    icon: Clock,
    tone: "info",
    title: "Your verification is under review",
    body: "We're currently reviewing your details. This usually takes 1–2 business days.",
  },
  MORE_INFORMATION_REQUIRED: {
    icon: ShieldAlert,
    tone: "warning",
    title: "We need more information",
    body: "Your verification needs additional documents before it can be approved.",
    cta: { label: "Update verification documents", href: "/broker/verification" },
  },
  REJECTED: {
    icon: XCircle,
    tone: "danger",
    title: "Verification was not approved",
    body: "Your broker verification was rejected. Review the notes and resubmit your documents.",
    cta: { label: "View details & resubmit", href: "/broker/verification" },
  },
  SUSPENDED: {
    icon: XCircle,
    tone: "danger",
    title: "Your account is suspended",
    body: "Contact support for details on your account status.",
  },
};

const VerificationGate = () => {
  const status = useVerificationStatus();

  if (!status || status === "VERIFIED") return null;

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;
  const Icon = config.icon;

  return (
    <Container $status={status}>
      <Icon />
      <div>
        <p className='font-medium text-sm'>{config.title}</p>
        <p className='text-sm mt-1 opacity-90'>{config.body}</p>
        {config.cta && (
          <Link to={config.cta.href} className='text-sm font-medium underline mt-2 inline-block'>
            {config.cta.label}
          </Link>
        )}
      </div>
    </Container>
  );
};

export default VerificationGate;
