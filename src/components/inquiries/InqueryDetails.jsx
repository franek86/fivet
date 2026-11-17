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
  VesselCard,
  VesselImage,
  VesselInfo,
  VesselName,
  VesselPrice,
} from "./Inquery.styles.js";
import BadgeStatus, { STATUS_LABELS } from "./BadgeStatus.jsx";
import { customFormatDate } from "../../utils/formatDate.js";

const STATUS_ORDER = ["OPEN", "RESPONDED", "CLOSED"];

function InqueryDetails({ inquiry, isUpdating, onBack, onStatusChange }) {
  const { ship } = inquiry;
  const subject = encodeURIComponent(`Re: Your inquiry about ${ship.shipName}`);

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
          <ReceivedAt>{customFormatDate(inquiry.createdAt)}</ReceivedAt>
        </HeaderText>

        <BadgeStatus status={inquiry.status} />
      </DetailHeader>

      <Body>
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

        <ReplyLink href={`mailto:${inquiry.senderEmail}?subject=${subject}`}>
          <Mail size={16} />
          Reply by email
        </ReplyLink>
      </Footer>
    </Article>
  );
}

export default InqueryDetails;
