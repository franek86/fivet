import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProfileCard = styled.section`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
`;

export const ProfileBanner = styled.div`
  height: 11rem;
  background: var(--color-accent);
  padding: 2rem;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1.5rem 1.5rem;
  background-color: var(--color-white);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

export const Avatar = styled.div`
  width: 9rem;
  height: 9rem;
  margin-top: -4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 4px solid var(--color-white);
  border-radius: var(--border-radius-lg);

  background: var(--color-accent-600);

  font-weight: 700;
  color: var(--color-text);
`;

export const ProfileDetails = styled.div`
  padding-bottom: 0.25rem;
`;

export const ProfileTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.75rem;
`;

export const Title = styled.h1`
  margin: 0;
  line-height: 3rem;
  font-weight: 700;
  letter-spacing: 0.025em;
  color: var(--color-text);
`;

export const Email = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.55rem 0 0;
  color: var(--color-text-muted);
`;

export const LastLogin = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  background: var(--color-grey-200);

  @media (min-width: 640px) {
    text-align: right;
  }
`;

export const Label = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--color-text-muted);
`;

export const LoginValue = styled.p`
  margin: 0;

  font-weight: 500;
`;

export const MainGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1.6fr 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CompanyGrid = styled.div`
  display: grid;
  gap: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const CompanyLogo = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  padding: 0%.8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent-600);
  border: 1px solid var(--color-white);
  border-radius: 0.75rem;
  font-weight: 700;
  color: var(--color-accent);
`;

export const Description = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.25rem;

  border-top: 1px solid var(--color-border);
`;

export const DescriptionText = styled.p`
  margin: 0.8rem 0 0;
  line-height: 1.625;
  color: var(--text-color);
`;

export const RoleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ExperienceCard = styled.div`
  padding: 1.5rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-grey-200);
`;

export const ExperienceLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 1.25rem;
  color: var(--color-text-muted);
`;

export const ExperienceValue = styled.p`
  margin: 1.25rem 0 0;
  line-height: 2rem;
  font-weight: 700;
  font-size: 3rem;
`;

export const DocumentsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 0.5rem 0 0;
  padding: 0;

  list-style: none;
`;

export const DocumentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.5rem 0.75rem;

  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
`;

export const DocumentIcon = styled.div`
  flex-shrink: 0;

  color: var(--color-accent-600);

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const DocumentInfo = styled.span`
  min-width: 0;
  flex: 1;
`;

export const DocumentName = styled.span`
  display: block;
  overflow: hidden;
  font-weight: 500;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DocumentMeta = styled.span`
  display: block;
`;

export const DownloadIcon = styled.div`
  flex-shrink: 0;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const VerificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const VerificationLabel = styled.span``;

export const SectionWrapper = styled.section`
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--color-white);
`;

export const SectionHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
`;

export const SectionTitle = styled.h2`
  margin: 0;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
`;

export const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.25rem;
  margin-top: 1rem;
`;

export const SectionBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldLabel = styled.span`
  font-size: 1.15rem;
  line-height: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--color-text-muted);
`;

export const FieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--color-text);

  svg {
    width: 1.8rem;
    height: 1.8rem;
    flex-shrink: 0;
    color: var(--color-accent-600);
  }
`;

export const FieldLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: var(--accent-600);
    text-decoration: underline;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.575rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 1.15rem;
  padding: 0.35rem 0.85rem;

  background-color: ${({ $status }) => {
    switch ($status) {
      case "VERIFIED":
        return "var(--color-success-200)";

      case "REJECTED":
        return "var(--color-danger-200)";

      case "SUSPENDED":
        return "var(--color-warning-200)";

      case "PENDING":
      default:
        return "var(--color-accent)";
    }
  }};
`;
