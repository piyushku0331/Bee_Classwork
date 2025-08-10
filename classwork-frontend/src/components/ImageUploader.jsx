import React, { useRef } from 'react';

const ImageUploader = ({ onChange, value }) => {
  const fileInput = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onChange) {
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        className="btn-secondary"
        onClick={() => fileInput.current && fileInput.current.click()}
      >
        {value ? 'Change Image' : 'Upload Image'}
      </button>
      {value && (
        <img
          src={typeof value === 'string' ? value : URL.createObjectURL(value)}
          alt="Preview"
          className="w-24 h-24 rounded-full object-cover border-2 border-genz-accent mt-2"
        />
      )}
    </div>
  );
};

export default ImageUploader;
