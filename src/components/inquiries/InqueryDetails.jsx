import { useState } from "react";
import { ArrowLeft, Mail, Phone, Ship as ShipIcon } from "lucide-react";

import {
  Article,
  Avatar,
  BackButton,
  Body,
  BreakAll,
  Contact,
  ContactLink,
  DetailHeader,
  Footer,
  HeaderText,
  Message,
  ReceivedAt,
  ReplyLink,
  SegmentButton,
  Segmented,
  SenderName,
  Subject,
  VesselCard,
  VesselImage,
  VesselInfo,
  VesselName,
  VesselPrice,
} from "./Inquery.styles.js";
import { formatDateTime } from "../../utils/formatDate.js";
import DeleteInquery from "./DeleteInquery.jsx";
import BadgeStatus, { STATUS_LABELS } from "./BadgeStatus.jsx";
import SaveContactButton from "./SaveContactButton.jsx";

import { useDeleteInquery, useSaveInquiryContact } from "../../hooks/useInquery.js";

const STATUS_ORDER = ["OPEN", "RESPONDED", "CLOSED"];

function InqueryDetails({ inquiry, isUpdating, onBack, onStatusChange }) {
  const [savedIds, setSavedIds] = useState();
  const { ship } = inquiry;
  const subject = encodeURIComponent(`Re: Your inquiry about ${ship.shipName}`);

  const { mutate } = useDeleteInquery();
  const { mutate: saveContact } = useSaveInquiryContact();

  const handleSaveContact = () => {
    if (!inquiry) return;

    saveContact({ id: inquiry?.id });
  };

  return (
    <Article>
      <DetailHeader>
        <BackButton type='button' onClick={onBack} aria-label='Back to inquiries'>
          <ArrowLeft size={20} />
        </BackButton>

        <Avatar $size={40} $font={14}>
          {inquiry.senderName}
        </Avatar>

        <HeaderText>
          <SenderName>{inquiry.senderName}</SenderName>
          <ReceivedAt>{formatDateTime(inquiry.createdAt)}</ReceivedAt>
        </HeaderText>

        <SaveContactButton onSaveContact={handleSaveContact} isSaving={saveContact.isPending} isSaved={savedIds?.has(inquiry.id)} />
        <BadgeStatus status={inquiry.status} />
      </DetailHeader>

      <Body>
        <Subject>
          Subject: <strong>{inquiry.subject}</strong>
        </Subject>
        <VesselCard>
          {ship.mainImage ? (
            <VesselImage src={ship.mainImage} alt='' />
          ) : (
            <VesselPlaceholder>
              <ShipIcon size={24} />
            </VesselPlaceholder>
          )}
          <VesselInfo>
            <VesselName>{ship.shipName}</VesselName>
            <VesselPrice>
              {ship.price} - {ship.currency}
            </VesselPrice>
          </VesselInfo>
        </VesselCard>

        <Contact>
          <ContactLink href={`mailto:${inquiry.senderEmail}`}>
            <Mail size={16} />
            <BreakAll>{inquiry.senderEmail}</BreakAll>
          </ContactLink>

          {inquiry.senderPhone && (
            <ContactLink href={`tel:${inquiry.senderPhone}`}>
              <Phone size={16} />
              {inquiry.senderPhone}
            </ContactLink>
          )}
        </Contact>

        <Message>{inquiry.message}</Message>
      </Body>

      <Footer>
        <Segmented role='group' aria-label='Inquiry status'>
          {STATUS_ORDER.map((status) => {
            const active = inquiry.status === status;
            return (
              <SegmentButton
                key={status}
                type='button'
                $active={active}
                aria-pressed={active}
                disabled={isUpdating || active}
                onClick={() => onStatusChange(status)}
              >
                {STATUS_LABELS[status]}
              </SegmentButton>
            );
          })}
        </Segmented>

        <div>
          <DeleteInquery onDelete={() => mutate(ship.id)} id={inquiry?.id} name={inquiry.subject} />

          <ReplyLink href={`mailto:${inquiry.senderEmail}?subject=${subject}`}>
            <Mail size={16} />
            Reply by email
          </ReplyLink>
        </div>
      </Footer>
    </Article>
  );
}

export default InqueryDetails;
