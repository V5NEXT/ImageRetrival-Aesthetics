import React, {useState} from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Spinner from './Spinner';


const ImageUploader = () => {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [depth, setDepth] = useState(null);
  const [ImageUploaded, setImageUploaded] = useState(false);
  const [imageAsset, setimageAsset] = useState();
  const [loading, setloading] = useState(false);
  const [WrongImageType, setWrongImageType] = useState(false);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null)

  const uploadImage = (e) =>{
    const {type, name} = e.target.files[0];
    setName(name);
    setType(type);
    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/gif'||type === 'image/tiff'){
      setWrongImageType(false);
      setimageAsset(URL.createObjectURL(e.target.files[0]))
      setImageUploaded(true);
      setloading(false);
      
        e.preventDefault();
    
        const data = new FormData();

        data.append('file', e.target.files[0]);
        localStorage.setItem('image', data);

        fetch('http://localhost:5000/upload', { 
          method: 'POST',
          mode: 'cors',
          body: data,
        }).then((response) => {
          if(response.ok){
            response.json().then((body) => {
              setData({ imageURL: `http://localhost:5000/upload/${body.file}` });
              let jsObject = JSON.parse(body?.message);
              setDepth(jsObject?.depth);
              setWidth(jsObject?.width);
              setHeight(jsObject?.height)
                        });
          }else{
            console.log("Error: ",response.statusText);
          }
        }).catch(error => console.log("Error: ",error))
  
    }
    else{
      setloading(true);
      setWrongImageType(true)
      setImageUploaded(false)
    }

  }
  

  return (
          <div className='flex flex-row justify-center items-center mt-5 lg:h-4/5'>
          <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
          <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
          {loading && <Spinner/>}
          {WrongImageType&&(
              <p>Wrong Image Type</p>
            )}
          {ImageUploaded?
          
          <div className='relative h-full'>
            <div className='flex flex-row'>
              <div className='basis-1/2'>
              <img src={imageAsset} alt='uploaded-pic' className='h-full w-full'/>
              </div>
              <div className='basis-1/2 ml-1'>
              <h1 className='ext-4xl font-bold break-words mt-3'>Image Details</h1>
              <table className="table-fixed">
                <tbody>
                  <tr>
                    <td>Dimensions : </td>
                    <td>{width}*{height}</td>
                  </tr>
                  <tr>
                    <td>Width : </td>
                    <td>{width}</td>
                  </tr>
                  <tr>
                    <td>Height : </td>
                    <td>{height}</td>
                  </tr>
                  <tr>
                    <td>Depth : </td>
                    <td>{depth}</td>
                  </tr>
                </tbody>
              </table> 
              <h1 className='ext-4xl font-bold break-words mt-3'>File Details</h1>
              <table className="table-fixed">
                <tbody>
                  <tr>
                    <td>Name : </td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Type : </td>
                    <td>{type}</td>
                  </tr>
                </tbody>
              </table> 
            </div>
          </div>
         
                    <button
          type='button'
          className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all ease-in-out'
          onClick={()=>{
            setimageAsset(null)
            setImageUploaded(false)
          }}
          >
            <MdDelete/>
          </button>
          </div>:<label>
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