import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import DataContext from './dataContext';
import { useContext } from 'react';
import ItemCard from './ItemCard';
import sampleImg from '../img/sample.png'

const Results = () => {
    const {data} = useContext(DataContext);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const Data = data;
    const [firstOccurrences, setfirstOccurrences] = useState([])
    const [obj, setObj] = useState({});


    useEffect(() => {
        setLoading(true)
        const score = Data?.message?.aesthetics?.scores
        if (score){
            setLoading(false)
            const score = Data?.message?.aesthetics?.scores
            let lastItem = score[score?.length - 1];
            setScore(lastItem)
            let array = Data?.message?.aesthetics?.links_and_cluster
            const updatedObj = {};
            array.forEach(([, cluster]) => {
              if (!updatedObj[cluster]) updatedObj[cluster] = 0;
              updatedObj[cluster]++;
            });
            setObj(updatedObj);
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


    

            if(loading === true){
                return <div className="bg-orange-100 border-l-4 w-screen border-orange-500 text-orange-700 p-4 text-center mt-5" role="alert">
                                <p className="font-bold">No Data to Display</p>
                                <p>Please Select the filters!</p>
                    </div>
                    }
        else{
        return (
            <>
            <div className="flex">

            <div className="w-1/2">
                {Data?.message?.scatterPlot?<img src={Data?.message?.scatterPlot} alt='Scatter plot' className='w-full'/>:<img src={sampleImg} alt='Scatter plot' className='h-full w-full'/>}
                {Data?.message?.silouttePlot?<img src={Data?.message?.silouttePlot} alt='Scatter plot' className='w-full'/>:<img src={sampleImg} alt='Scatter plot' className='h-full w-full'/>}
            </div>
            <div className="w-1/2 flex flex-col">
                <div className="flex mt-5">
                <div className="w-1/2">
                <p className="text-gray-600 text-xs italic">* Figure depicts the edges used for calculating the aesthetics score</p>
                <div className="relative w-64 h-64 mt-2">
                    {Data?.message?.aesthetics?.canny?<img src={Data?.message?.aesthetics?.canny} alt="Your image" className="absolute top-0 left-0 h-full w-full object-cover" />:<img src={sampleImg} alt="Your image" className="absolute top-0 left-0 h-full w-full object-cover" />}
                </div>                
                </div>
                <div className="w-1/2">
                <p className="text-gray-600 text-xs italic">* Figure depicts the thresholded image for calculating the aesthetics score</p>
                <div className="relative w-64 h-64 mt-2 content-center	">
                    {Data?.message?.aesthetics?.threshold?<img src={Data?.message?.aesthetics?.threshold} alt="Your image" className="absolute top-0 left-0 h-full w-full object-cover" />:<img src={sampleImg} alt="Your image" className="absolute top-0 left-0 h-full w-full object-cover" />}
                </div>  
                </div>
                </div>
                <div className="flex mt-5">
                <span className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Average Aesthetic Score: {Data?.message?.aesthetics?.avg_score}</label>
                </span>
                <span className="w-1/2">
                <label className="block text-gray-700 font-medium mt-2">Aesthetic Score for uploaded image: {score}</label>
                </span>
                </div>
                <div className="font-bold text-xl mt-2">
                    Cluster Information :
                </div>
                <div className="w-full mt-2">
                <div className="flex flex-wrap">
                {firstOccurrences.map(item => (
                    <ItemCard key={item.id} product={item} />
                    ))}
                    
                                    </div>
                </div>
                <div className="flex mt-5">
                {Object.entries(obj).map(([key, value], index) => (
                    <div
                    key={key}
                    className={`p-3 border ml-10 border-gray-400 rounded mr-3 ${index !== Object.entries(obj).length - 1 ? 'mr-3' : ''}`}
                    >
                    {`Cluster: ${key}, Items: ${value}`}
                    </div>
                ))}
                </div>
            </div>
            </div>
    </>
  )
}
}

export default Results