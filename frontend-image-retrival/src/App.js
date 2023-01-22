import './App.css';
import ImageUploader from './components/ImageUploader.jsx';
import Filters from './components/Filters.jsx';
import Results from './components/Results';
import DataContext from './components/dataContext';
import { useState } from 'react';
 


function App() {
  const [data, setData] = useState(null);

  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
 
        <div className='flex flex-col items-center'>
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Image Aesthetic</span> Retrival</h1>
         </div>
        <div class="flex flex-row bg-gray-50">
          <div class="basis-1/2">
            <ImageUploader/>
          </div>
          <div class="basis-1/2">
            <Filters/>
          </div>
        </div>
        <div className='flex flex-row'>
          <Results/>
        </div>
        </DataContext.Provider>

    </>
  );
}

export default App;
