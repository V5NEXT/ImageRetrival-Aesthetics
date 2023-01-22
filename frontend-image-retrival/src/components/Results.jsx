import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import DataContext from './dataContext';
import { useContext } from 'react';
import ItemCard from './ItemCard';

const Results = () => {
    const {data} = useContext(DataContext);
    const [score, setScore] = useState(0)
    const Data = data;
    const [firstOccurrences, setfirstOccurrences] = useState([])

    useEffect(() => {
        const score = Data?.message?.aesthetics?.scores
        if (score){
            const score = Data?.message?.aesthetics?.scores
            let lastItem = score[score?.length - 1];
          setScore(lastItem)
            let array = Data?.message?.aesthetics?.links_and_cluster
            let uniqueValues = new Set();
            let newFirstOccurrences = [...firstOccurrences];
            for (let sublist of array) {
                if (!uniqueValues.has(sublist[1])) {
                    uniqueValues.add(sublist[1]);
                    let imageUrl = sublist[0]; 
                    let image = new Image(); 
                    image.src = imageUrl; 
                    newFirstOccurrences.push({"image":image.src, "cluster":sublist[1]});
                }
            }
            setfirstOccurrences(newFirstOccurrences);
        }
    }, [data])  


{!Data && <Spinner/>}
  return (
    <>
            <div className="flex">
            <div className="w-1/2">
                <img src={Data?.message?.scatterPlot} alt='Scatter plot' className='h-full w-full'/>
            </div>
            <div className="w-1/2 flex flex-col">
                <div className="flex mt-5">
                <div className="w-1/2">
                <p className="text-gray-600 text-xs italic">* Figure depicts the edges used for calculating the aesthetics score</p>
                <div className="relative w-64 h-64 mt-2">
                <img src={Data?.message?.aesthetics?.canny} alt="Your image" className="absolute top-0 left-0 h-full w-full object-cover" />
                </div>                
                </div>
                <div className="w-1/2">
                <p className="text-gray-600 text-xs italic">* Figure depicts the thresholded image used for calculating the aesthetics score</p>
                <div className="relative w-64 h-64 mt-2">
                <img src={Data?.message?.aesthetics?.threshold} alt="Your image" className="absolute top-0 left-0 h-full w-full object-cover" />
                </div>  
                </div>
                </div>
                <div className="flex">
                <span className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Average Aesthetic Score: {Data?.message?.aesthetics?.avg_score}</label>
                {/* <h6 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Average Aesthetic Score: {Data?.message?.aesthetics?.avg_score}</h6> */}
                </span>
                <span className="w-1/2">
                <label className="block text-gray-700 font-medium mt-2">Aesthetic Score for uploaded image: {score}</label>
                {/* <h6 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Aesthetic Score for closest clusters: {Data?.message?.aesthetics?.scores}</h6> */}
                </span>
                </div>
                <div className='flex mt-2'>
            {firstOccurrences.map((item, index)=>{
    return <ItemCard key={index} product={item}/>
})}
            </div>
            </div>
            </div>

    </>
  )
}

export default Results