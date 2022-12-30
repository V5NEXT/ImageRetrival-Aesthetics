import React, {useState} from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';


const ImageUploader = () => {
  const [ImageUploaded, setImageUploaded] = useState(false)
  const [imageAsset, setimageAsset] = useState(null)

  const uploadImage = () =>{
    
  }

  return (
<div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
<div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
<div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
 <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
 {ImageUploaded?<img src={imageAsset?.url} alt='User Uploaded Image'/>:<label>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='flex flex-col justify-center items-center'>
        <p className='font-bols text-2xl'>
          <AiOutlineCloudDownload/>
        </p>
        <p className='text-lg'>
        Click to upload
        </p>
        </div>
        <p className='mt-32 text-gray-400'>
          Use high-quality JPG, SVG, PNG, GIF less than 20MB
        </p>
      </div>
      <input
      type="file"
      name="upload-image"
      onChange={uploadImage}
      className='w-0 h-0'
      />
    </label>}

 </div>
 </div>
 </div>
</div>
  )
}

export default ImageUploader