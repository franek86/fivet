import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
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

import {
  Container,
  ProfileCard,
  ProfileBanner,
  ProfileContent,
  ProfileInfo,
  Avatar,
  ProfileDetails,
  ProfileTitle,
  Title,
  Email,
  LastLogin,
  Label,
  LoginValue,
  MainGrid,
  Column,
  CompanyGrid,
  CompanyLogo,
  Description,
  DescriptionText,
  RoleContent,
  StatusRow,
  ExperienceCard,
  ExperienceLabel,
  ExperienceValue,
  DocumentsList,
  DocumentItem,
  DocumentIcon,
  DocumentInfo,
  DocumentName,
  DocumentMeta,
  DownloadIcon,
  VerificationList,
  VerificationLabel,
  SectionWrapper,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionBody,
  FieldWrapper,
  FieldLabel,
  FieldValue,
  FieldLink,
  Badge,
} from "./SingleUserProfile.styles.js";
import BackBtn from "../../BackBtn.jsx";
import Spinner from "../../Spinner.jsx";

import { getSingleUserProfileApi } from "../../../services/apiUsers.js";
import { formatDateTime } from "../../../utils/formatDate.js";

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

function StatusBadge({ status = "PENDING" }) {
  const { Icon, label } = statusStyles[status];
  return (
    <Badge $status={status}>
      <Icon size={16} />
      {label}
    </Badge>
  );
}

const Field = ({ icon: Icon, label, value, href }) => {
  return (
    <FieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>
        {Icon ? <Icon className='size-4 shrink-0 text-accent-600' /> : null}
        {href ? <FieldLink href={href}>{value}</FieldLink> : value}
      </FieldValue>
    </FieldWrapper>
  );
};

const Section = ({ title, subtitle, action, children }) => {
  return (
    <SectionWrapper>
      <SectionHeader>
        <div>
          <SectionTitle>{title}</SectionTitle>
          {subtitle ? <SectionSubtitle>{subtitle}</SectionSubtitle> : null}
        </div>
        {action}
      </SectionHeader>
      <SectionBody>{children}</SectionBody>
    </SectionWrapper>
  );
};

const SingleProfileData = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getSingleUserProfileApi(id),
  });

  {
    if (isLoading) return <Spinner />;
  }
  console.log(data);
  return (
    <main>
      <Container>
        <ProfileCard>
          <ProfileBanner>
            <BackBtn />
          </ProfileBanner>

          <ProfileContent>
            <ProfileInfo>
              <Avatar>{data.avatar}</Avatar>

              <ProfileDetails>
                <ProfileTitle>
                  <Title>{data.fullName}</Title>
                  {data.role === "BROKER" && <StatusBadge status={data?.brokerProfile?.verificationStatus} />}
                  {data.role === "OWNER" && <StatusBadge status={data?.ownerProfile?.verificationStatus} />}
                </ProfileTitle>

                <Email>
                  <Mail size={16} />
                  {data.email}
                </Email>
              </ProfileDetails>
            </ProfileInfo>

            <LastLogin>
              <Label>Last login</Label>
              <LoginValue>{formatDateTime(data.lastLogin)}</LoginValue>
            </LastLogin>
          </ProfileContent>
        </ProfileCard>

        <MainGrid>
          <Column>
            <Section
              title='Company'
              subtitle='Business entity linked to this account'
              action={<CompanyLogo>{data?.company?.logo}</CompanyLogo>}
            >
              <CompanyGrid>
                <Field icon={Building2} label='Name' value={data?.company?.name} />
                <Field label='Legal name' value={data?.company?.legaleName} />
                <Field icon={Receipt} label='VAT number' value={data?.company?.vat} />
                <Field icon={Globe} label='Website' value={data?.company?.website} href={`https://${data?.company?.website}`} />
                <Field icon={Mail} label='Business email' value={data?.company?.email} href={`mailto:${data?.company?.email}`} />
                <Field icon={Phone} label='Phone' value={data?.company?.phone} />
                <Field icon={MapPin} label='Address' value={data?.company?.address} />
                <Field label='City' value={data?.company?.city} />
                <Field label='Country' value={data?.company?.country} />
              </CompanyGrid>

              <Description>
                <Label>Description</Label>
                <DescriptionText>{data?.company?.description}</DescriptionText>
              </Description>
            </Section>
          </Column>

          <Column>
            {data.role === "BROKER" ? (
              <Section title='Broker profile' subtitle='Role-specific credentials'>
                <RoleContent>
                  <StatusRow>
                    <Label>Verification status</Label>
                    <StatusBadge status={data?.brokerProfile?.verificationStatus} />
                  </StatusRow>

                  <ExperienceCard>
                    <ExperienceLabel>
                      <Briefcase size={16} />
                      Years of experience
                    </ExperienceLabel>

                    <ExperienceValue>{data?.brokerProfile?.yearsExperience}</ExperienceValue>
                  </ExperienceCard>
                </RoleContent>
              </Section>
            ) : (
              <Section title='Owner profile' subtitle='Role-specific credentials'>
                <RoleContent>
                  <StatusRow>
                    <Label>Verification status</Label>
                    <StatusBadge status={data?.ownerStatus?.verificationStatus} />
                  </StatusRow>

                  <div>
                    <Label>Documents</Label>

                    <DocumentsList>
                      {data.ownerProfile?.documents.map((doc) => (
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
                    <VerificationLabel>
                      {s === data?.brokerProfile?.verificationStatus ? "Current status" : statusStyles[s].label}
                    </VerificationLabel>

                    <StatusBadge status={s} />
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
