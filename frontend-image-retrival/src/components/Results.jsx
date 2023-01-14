import React, {useState, useEffect} from 'react';
import ItemCard from './ItemCard';

const Results = () => {
 
    const [imageSet, setImageSet] = useState([{}])
 

    useEffect(() => {
        fetch("/imageSet").then(
            res => res.json()
        ).then(
            data => {
                setImageSet(data.imageSet.products)
                console.log(data.imageSet.products)
            }
        )
    }, [])
    
// if(!mockData?.length) return 'Loading...';
  return (
    <>
    <div className='flex flex-row flex-wrap items-center justify-center h-screen overflow-scroll'>
        {
            (typeof imageSet === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                imageSet.map((image,i)=>(
                    <ItemCard key={i} product={image}/>
                ))
            )
        }
    </div>
    </>
  )
}

export default Results