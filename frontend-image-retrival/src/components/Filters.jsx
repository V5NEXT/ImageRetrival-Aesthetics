import React from 'react'

const Filters  = () => {
  return (
    <>
    <div className='flex mt-4'>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Please Select a Model/Method
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/4'>
          <div className="form-check">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
              VGG16
            </label>
        </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
              <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
              InceptionV3
              </label>
          </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
              <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
              ResNet50
              </label>
          </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
              <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
              Based on Color
              </label>
          </div>
        </div>
    </div>
    <div className='flex mt-4'>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Please Select a Similarity Measure
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/4'>
          <div className="form-check">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault2"/>
            <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
            Euclidean
            </label>
        </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" checked/>
              <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
              Cosine Similarity
              </label>
          </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" checked/>
              <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
              Manhattan
              </label>
          </div>
        </div>
    </div>
    <div className='flex mt-4'>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Please Select a Clustering Method
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/4'>
          <div className="form-check">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault3" id="flexRadioDefault3"/>
            <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault3">
              K-Means
            </label>
        </div>
        </div>
    </div>

    <div className='flex mt-4'>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Please Select a dimensionality-reduction method
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/4'>
          <div className="form-check">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault4" id="flexRadioDefault4"/>
            <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault4">
              PCA
            </label>
        </div>
        </div>

    </div>
    <div className='flex mt-4 flex-col items-center'>
    <a href="#_" class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-indigo-500 rounded-md hover:bg-indigo-800 sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
      Run 
    <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
    </div>
    </>    
  )
}

export default Filters