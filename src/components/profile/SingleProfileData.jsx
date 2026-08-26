import {
  BadgeCheck,
  Building2,
  Clock,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Receipt,
  ShieldAlert,
  ShieldX,
  Download,
  Briefcase,
} from "lucide-react";
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
  height: 8rem;
  background: var(--color-accent);
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
  letter-spacing: -0.025em;
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
  gap: 1.25rem;

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
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
`;

export const ExperienceLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const ExperienceValue = styled.p`
  margin: 0.25rem 0 0;

  line-height: 2rem;
  font-weight: 700;
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
  background: var(--white);
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
`;

export const SectionBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FieldLabel = styled.span`
  line-height: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;

  color: var(--color-text);
`;

export const FieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  line-height: 1.25rem;
  font-weight: 500;

  color: var(--color-text);

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--color-text);
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

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.575rem;
  border-radius: 9999px;
  border: 1px solid;
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

const user = {
  fullName: "Marta Kowalska",
  email: "marta.kowalska@northgate-re.com",
  lastLogin: "26 Aug 2026, 08:42 (UTC+2)",
  initials: "MK",
  status: "VERIFIED",
  role: "broker",
  brokerStatus: "VERIFIED",
  yearsOfExperience: 9,
  ownerStatus: "PENDING",
};

const company = {
  name: "Northgate RE",
  legalName: "Northgate Real Estate Sp. z o.o.",
  vat: "PL 5252445566",
  website: "www.northgate-re.com",
  businessEmail: "office@northgate-re.com",
  phone: "+48 22 118 44 90",
  address: "ul. Prosta 51, 00-838",
  city: "Warsaw",
  country: "Poland",
  description:
    "Boutique commercial real-estate agency specialising in office and logistics leasing across Central Europe. Founded in 2016, the team advises landlords and occupiers on 120+ transactions per year.",
};

const statusStyles = {
  VERIFIED: {
    label: "VERIFIED",
    Icon: BadgeCheck,
  },
  PENDING: {
    label: "PENDING",
    Icon: Clock,
  },
  SUSPENDED: {
    label: "SUSPENDED",
    Icon: ShieldAlert,
  },
  REJECTED: {
    label: "REJECTED",
    Icon: ShieldX,
  },
};

function StatusBadge({ status }) {
  const { Icon, label } = statusStyles[status];
  return (
    <Badge $status={status}>
      <Icon size={16} />
      {label}
    </Badge>
  );
}

function Field({ icon: Icon, label, value, href }) {
  return (
    <FieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>
        {Icon ? <Icon className='size-4 shrink-0 text-accent-600' /> : null}
        {href ? <FieldLink href={href}>{value}</FieldLink> : value}
      </FieldValue>
    </FieldWrapper>
  );
}

function Section({ title, subtitle, action, children }) {
  return (
    <SectionWrapper>
      <SectionHeader>
        <Section>
          <SectionTitle>{title}</SectionTitle>
          {subtitle ? <SectionSubtitle>{subtitle}</SectionSubtitle> : null}
        </Section>
        {action}
      </SectionHeader>
      <SectionBody>{children}</SectionBody>
    </SectionWrapper>
  );
}

const SingleProfileData = () => {
  return (
    <main>
      <Container>
        <ProfileCard>
          <ProfileBanner />

          <ProfileContent>
            <ProfileInfo>
              <Avatar>{user.avatar}</Avatar>

              <ProfileDetails>
                <ProfileTitle>
                  <Title>{user.fullName}</Title>
                  <StatusBadge status={user.status} />
                </ProfileTitle>

                <Email>
                  <Mail size={16} />
                  {user.email}
                </Email>
              </ProfileDetails>
            </ProfileInfo>

            <LastLogin>
              <Label>Last login</Label>
              <LoginValue>{user.lastLogin}</LoginValue>
            </LastLogin>
          </ProfileContent>
        </ProfileCard>

        <MainGrid>
          <Column>
            <Section title='Company' subtitle='Business entity linked to this account' action={<CompanyLogo>NG</CompanyLogo>}>
              <CompanyGrid>
                <Field icon={Building2} label='Name' value={company.name} />
                <Field label='Legal name' value={company.legalName} />
                <Field icon={Receipt} label='VAT number' value={company.vat} />
                <Field icon={Globe} label='Website' value={company.website} href={`https://${company.website}`} />
                <Field icon={Mail} label='Business email' value={company.businessEmail} href={`mailto:${company.businessEmail}`} />
                <Field icon={Phone} label='Phone' value={company.phone} />
                <Field icon={MapPin} label='Address' value={company.address} />
                <Field label='City' value={company.city} />
                <Field label='Country' value={company.country} />
              </CompanyGrid>

              <Description>
                <Label>Description</Label>
                <DescriptionText>{company.description}</DescriptionText>
              </Description>
            </Section>
          </Column>

          <Column>
            {user.role === "broker" ? (
              <Section title='Broker profile' subtitle='Role-specific credentials'>
                <RoleContent>
                  <StatusRow>
                    <Label>Verification status</Label>
                    <StatusBadge status={user.brokerStatus} size='sm' />
                  </StatusRow>

                  <ExperienceCard>
                    <ExperienceLabel>
                      <Briefcase />
                      Years of experience
                    </ExperienceLabel>

                    <ExperienceValue>{user.yearsOfExperience}</ExperienceValue>
                  </ExperienceCard>
                </RoleContent>
              </Section>
            ) : (
              <Section title='Owner profile' subtitle='Role-specific credentials'>
                <RoleContent>
                  <StatusRow>
                    <Label>Verification status</Label>
                    <StatusBadge status={user.ownerStatus} size='sm' />
                  </StatusRow>

                  <div>
                    <Label>Documents</Label>

                    <DocumentsList>
                      {documents.map((doc) => (
                        <DocumentItem key={doc.name}>
                          <DocumentIcon>
                            <FileText />
                          </DocumentIcon>

                          <DocumentInfo>
                            <DocumentName>{doc.name}</DocumentName>
                            <DocumentMeta>{doc.meta}</DocumentMeta>
                          </DocumentInfo>

                          <DownloadIcon>
                            <Download />
                          </DownloadIcon>
                        </DocumentItem>
                      ))}
                    </DocumentsList>
                  </div>
                </RoleContent>
              </Section>
            )}

            <Section title='Verification' subtitle='Reviewed by an administrator'>
              <VerificationList>
                {["PENDING", "VERIFIED", "SUSPENDED", "REJECTED"].map((s) => (
                  <StatusRow key={s}>
                    <VerificationLabel>{s === user.status ? "Current status" : statusStyles[s].label}</VerificationLabel>

                    <StatusBadge status={s} size='sm' />
                  </StatusRow>
                ))}
              </VerificationList>
            </Section>
          </Column>
        </MainGrid>
      </Container>
    </main>
  );
};

export default SingleProfileData;
