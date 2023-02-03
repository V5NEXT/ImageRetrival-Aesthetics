import React,{useState} from 'react'
import { useContext } from 'react';
import DataContext from './dataContext';
import Spinner from './Spinner';


const Filters  = () => {
  const [method, setMethod] = useState("VGG16");
  const [clusters, setClusters] = useState(2)
  const [images, setImages] = useState(5)
  const [img, setImg] = useState(null)
  const { setData } = useContext(DataContext);
  const [loading, setLoading] = useState(false)

  const onOptionChange = e => {
    setMethod(e.target.value);
};
const SubmitFilters = ()=>{
setLoading(true)
const myjson = {
  "method": method,
  "clusters": clusters,
  "images": images,
}


fetch('http://localhost:5000/filters', { 
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(myjson),
}).then((response) => {
  if(response.ok){
    response.json().then((body) => {
      setData(body)
      setLoading(false);
               
    });
  }else{
    console.log("Error: ",response.statusText);
    setLoading(false);

  }
}).catch(error => 
  console.log("Error: ",error))
}

if(loading === true){
  return <Spinner/>
}
else{
return (
    <>
    <div className='flex mt-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Please Select a Model/Method
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/4'>
          <div className="form-check">
          <input
          type="radio"
          name="VGG16"
          value="VGG16"
          id="VGG16"
          checked={method === "VGG16"}
          onChange={onOptionChange}
          />            
          <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
              VGG16
            </label>
        </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
            <input
          type="radio"
          name="InceptionV3"
          value="InceptionV3"
          id="InceptionV3"
          checked={method === "InceptionV3"}
          onChange={onOptionChange}
          />     <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
              InceptionV3
              </label>
          </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
            <input
          type="radio"
          name="ResNet50"
          value="ResNet50"
          id="ResNet50"
          checked={method === "ResNet50"}
          onChange={onOptionChange}
          />              
          <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
              ResNet50
              </label>
          </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
            <input
          type="radio"
          name="Color"
          value="Color"
          id="Color"
          checked={method === "Color"}
          onChange={onOptionChange}
          />               
           <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
              Based on Color
              </label>
          </div>
        </div>
    </div>
    <div className='flex mt-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Enter Number of Clusters
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/2'>
          <div className="form-check">
          <input type="number" id="clusters"  onChange={(e) => setClusters(parseInt(e.target.value))} value={clusters} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
          <p className="text-gray-600 text-xs italic">Number of Clusters that needs to created, eg: 2</p>

        </div>
        </div>
    </div>
    <div className='flex mt-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Enter Number of Images
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/2'>
          <div className="form-check">
          <input type="number" id="images"  onChange={(e) => setImages(parseInt(e.target.value))} value={images} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
          <p className="text-gray-600 text-xs italic">Number of Images used for clustering, eg: 10 less than 2000</p>      
          <p className="text-gray-600 text-xs font-bold">*Incresing the number of images will take more processing time</p>

        </div>
        </div>
    </div>
    <div className='flex mt-4 flex-col items-center'>
    <a href="#_" onClick={SubmitFilters} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-indigo-500 rounded-md hover:bg-indigo-800 sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
      Run 
    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </a>
    </div>
    </>    
  )
}
}

export default Filters