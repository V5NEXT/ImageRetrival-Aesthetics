import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    const res = await axios.post('/extract_features', formData);
    setFeatures(res.data);
  };

  const handleExtractFeatures = async () => {
    const formData = new FormData();
    formData.append('image', image);

    const res = await axios.post('/extract_features', formData);
    setFeatures(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <button onClick={handleExtractFeatures}>Extract Features</button>
      {features && <p>Features: {features}</p>}
    </div>
  );
};

export default ImageUpload;
