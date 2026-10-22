import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, FileText, Globe, Mail, MapPin, Phone, Receipt, Download, Briefcase } from "lucide-react";

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
  statusStyles,
} from "../SingleUserProfile.styles.js";

import BackBtn from "../../BackBtn.jsx";
import Spinner from "../../Spinner.jsx";

import SectionUserProfile from "./SectionUserProfile.jsx";
import SectionUserField from "./SectionUserField.jsx";
import StatusUserBadge from "./SectionUserBadge.jsx";

import { getSingleUserProfileApi } from "../../../services/apiUsers.js";
import { formatDateTime } from "../../../utils/formatDate.js";
import { useUpdateUserProfileVerification } from "../../../hooks/useProfile.js";

const SingleProfileData = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getSingleUserProfileApi(id),
  });

  const { mutate: updateVerification, isPending } = useUpdateUserProfileVerification();

  if (isLoading) return <Spinner />;
  if (isPending) return <Spinner />;

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
                  {data.role === "BROKER" && <StatusUserBadge status={data?.brokerProfile?.verificationStatus} />}
                  {data.role === "OWNER" && <StatusUserBadge status={data?.ownerProfile?.verificationStatus} />}
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
            <SectionUserProfile
              title='Company'
              subtitle='Business entity linked to this account'
              action={<CompanyLogo>{data?.company?.logo}</CompanyLogo>}
            >
              <CompanyGrid>
                <SectionUserField icon={Building2} label='Name' value={data?.company?.name} />
                <SectionUserField label='Legal name' value={data?.company?.legalName} />
                <SectionUserField icon={Receipt} label='VAT number' value={data?.company?.vat} />
                <SectionUserField icon={Globe} label='Website' value={data?.company?.website} href={`https://${data?.company?.website}`} />
                <SectionUserField icon={Mail} label='Business email' value={data?.company?.email} href={`mailto:${data?.company?.email}`} />
                <SectionUserField icon={Phone} label='Phone' value={data?.company?.phone} />
                <SectionUserField icon={MapPin} label='Address' value={data?.company?.address} />
                <SectionUserField label='City' value={data?.company?.city} />
                <SectionUserField label='Country' value={data?.company?.country} />
              </CompanyGrid>

              <Description>
                <Label>Description</Label>
                <DescriptionText>{data?.company?.description}</DescriptionText>
              </Description>
            </SectionUserProfile>
          </Column>

          <Column>
            {data.role === "BROKER" ? (
              <SectionUserProfile title='Broker profile' subtitle='Role-specific credentials'>
                <RoleContent>
                  <StatusRow>
                    <Label>Verification status</Label>
                    <StatusUserBadge status={data?.brokerProfile?.verificationStatus} />
                  </StatusRow>

                  <ExperienceCard>
                    <ExperienceLabel>
                      <Briefcase size={16} />
                      Years of experience
                    </ExperienceLabel>

                    <ExperienceValue>{data?.brokerProfile?.yearsExperience}</ExperienceValue>
                  </ExperienceCard>
                </RoleContent>
              </SectionUserProfile>
            ) : (
              <SectionUserProfile title='Owner profile' subtitle='Role-specific credentials'>
                <RoleContent>
                  <StatusRow>
                    <Label>Verification status</Label>
                    <StatusUserBadge status={data?.ownerStatus?.verificationStatus} />
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
              </SectionUserProfile>
            )}

            <SectionUserProfile title='Verification' subtitle='Reviewed by an administrator'>
              <VerificationList>
                {["PENDING", "VERIFIED", "SUSPENDED", "REJECTED"].map((s) => (
                  <StatusRow
                    key={s}
                    onClick={() => {
                      updateVerification({ userId: id, verificationStatus: s });
                    }}
                  >
                    <VerificationLabel>
                      {s === data?.brokerProfile?.verificationStatus ? <span>Current status</span> : statusStyles[s].label}
                    </VerificationLabel>

                    <StatusUserBadge status={s} />
                  </StatusRow>
                ))}
              </VerificationList>
            </SectionUserProfile>
          </Column>
        </MainGrid>
      </Container>
    </main>
  );
};

export default SingleProfileData;
