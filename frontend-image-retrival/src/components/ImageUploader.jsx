import React, {useState} from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Spinner from './Spinner';


const ImageUploader = () => {
  const [ImageUploaded, setImageUploaded] = useState(false);
  const [imageAsset, setimageAsset] = useState(null);
  const [loading, setloading] = useState(false);
  const [WrongImageType, setWrongImageType] = useState(false)

  const uploadImage = (e) =>{
    const {type, name} = e.target.files[0];

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/gif'||type === 'image/tiff'){
      setloading(true);
      setWrongImageType(false);
      const document = URL.createObjectURL(e.target.files[0])
      setimageAsset(document)
    }
    else{
      setWrongImageType(true)
    }

  }

  return (
          <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
          <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
          <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
          {loading && <Spinner/>}
          {WrongImageType&&(
              <p>Wrong Image Type</p>
            )}
          {ImageUploaded?
          
          <div className='relative h-full'>
          <img src={imageAsset} alt='uploaded-pic' className='h-full w-full'/>
          <button
          type='button'
          className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all ease-in-out'
          onClick={()=>{
            setimageAsset(null)
          }}
          >
            <MdDelete/>
          </button>
          </div>
          
          :<label>
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