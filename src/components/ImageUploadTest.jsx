import { useState } from "react";
import Input from "./ui/Input.jsx";

function ImageUploadTest({ onImageSelect, name }) {
  const [previewImage, setPreviewImage] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  return (
    <div className='flex flex-col items-center space-y-2'>
      {previewImage && <img src={previewImage} alt='Preview' className='w-32 h-32 object-cover rounded-lg' />}
      <Input name={name} type='file' accept='image/*' onChange={handleFileChange} />
    </div>
  );
}

export default ImageUploadTest;
