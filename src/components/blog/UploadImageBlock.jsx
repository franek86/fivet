import { Image } from "lucide-react";
import { useRef, useState } from "react";
import styled from "styled-components";

const ImageField = styled.div`
  width: 100%;
  border: 2px dashedvar(--color-grey-200);
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.5rem;
`;

const EmptyUploadDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.85rem 1.4rem;

  &:hover {
    border-color: #6366f1;
    background: #f0f1ff;
    color: #4f46e5;
  }
`;

const PreviewImg = styled.img`
  height: 150px;
  object-fit: contain;
  aspect-ratio: 16 / 9;
`;

const UploadImageBlock = ({ onChange }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(false);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };
  return (
    <>
      <input className='image-input' type='file' accept='image/*' ref={fileInputRef} onChange={handleOnChange} />

      <ImageField onClick={handleBoxClick}>
        {preview ? (
          <PreviewImg src={preview} alt='preview' />
        ) : (
          <EmptyUploadDiv>
            <Image size={16} />
            <p>Click to upload image</p>
          </EmptyUploadDiv>
        )}
      </ImageField>
    </>
  );
};

export default UploadImageBlock;
