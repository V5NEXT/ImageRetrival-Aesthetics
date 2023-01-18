import React from 'react'

const Filters  = () => {
  return (
    <>
    <div className='flex mt-4'>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Please Select an Algorithm
      </label>
    </div>
      <div className="flex flex-row">
        <div className='basis-1/4'>
          <div className="form-check">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
              Use K-Means 
            </label>
        </div>
        </div>
        <div className='basis-1/4'>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
              <label className="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
                Use ISO-DATA
              </label>
          </div>
        </div>
    </div>
    </>    
  )
}

export default Filters