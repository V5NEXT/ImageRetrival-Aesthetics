import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import DataContext from './dataContext';
import { useContext } from 'react';

const Results = () => {
    const {data} = useContext(DataContext);

    const Data = data
    
      
    // const [imageSet, setImageSet] = useState([{}])
 
    // useEffect(() => {
    //     fetch("/imageSet").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setImageSet(data.imageSet.products)
    //             console.log(data)
    //         }
    //     )
    // }, [])
    
// if(!Data?.length) return 'Loading...';
// {!Data?.length && <Spinner/>}
  return (
    <>
     {/* <div className='flex flex-col items-center'>
        <h3 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Results</h3>
     </div> */}
    <div className='flex flex-row flex-wrap  h-screen overflow-scroll'>
        <div className='flex basic-1/2'>
            <div className='flex flex-row'>
                <div className='flex basic-1/3'>
                <img src={Data?.message?.scatterPlot} alt='Scatter plot' className='h-full w-full'/>
                </div>
                <div className='flex basic-2/3'>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Sliver
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    Gray
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    Phone
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
            </tr>
            <tr>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple Watch 5
                </th>
                <td class="px-6 py-4">
                    Red
                </td>
                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    Wearables
                </td>
                <td class="px-6 py-4">
                    $999
                </td>
            </tr>
        </tbody>
            </table> 
                </div>
            </div>
        </div>
        <div className='flex  basic-1/2'>
            <div className='flex flex-row'>
            <h5 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Average Aesthetic Score: {Data?.message?.aesthetics?.avg_score}</h5>
            <h5 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Aesthetic Score for closest clusters: {Data?.message?.aesthetics?.scores}</h5>
            <div className='flex basic-1/2'>
            <p class="text-gray-600 text-xs italic">Canny Image of the uploaded file *used for aestheticsscore calculation</p>

            <img src={Data?.message?.aesthetics?.canny} alt='Canny Plot' className='h-full w-full'/>

            </div>
            <div className='flex basic-1/2'>
            <p class="text-gray-600 text-xs italic">Threshold Image of the uploaded file *used for aestheticsscore calculation</p>

            <img src={Data?.message?.aesthetics?.threshold} alt=' threshold plot' className='h-full w-full'/>

            </div>
            </div>
     
        </div>
    </div>
    </>
  )
}

export default Results