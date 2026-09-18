import styled from "styled-components";

export const FormHeader = ({ progress, completedRequiredFields, requiredFields }) => {
  return (
    <Header>
      <div>
        <Eyebrow>VESSEL MANAGEMENT</Eyebrow>
        <Subtitle> Add vessel information and publish it to your marketplace. </Subtitle>
      </div>
      <ProgressBox>
        <ProgressText>
          <strong>{progress}%</strong> <span>completed</span>
        </ProgressText>
        <ProgressTrack>
          <ProgressValue $progress={progress} />
        </ProgressTrack>
        <ProgressHint>
          {completedRequiredFields} of {requiredFields.length} required fields
        </ProgressHint>
      </ProgressBox>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #6b7280;
  margin-bottom: 8px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  line-height: 1.15;
  letter-spacing: -0.03em;
`;
const Subtitle = styled.p`
  margin: 10px 0 0;
  color: #697386;
  font-size: 15px;
`;
const ProgressBox = styled.div`
  width: 220px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ProgressText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 8px;
  strong {
    font-size: 20px;
  }
  span {
    color: #7a8494;
    font-size: 13px;
  }
`;
const ProgressTrack = styled.div`
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
`;
const ProgressValue = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  background: #1d4ed8;
  border-radius: inherit;
  transition: width 0.25s ease;
`;
const ProgressHint = styled.div`
  margin-top: 7px;
  font-size: 12px;
  color: #7a8494;
`;
