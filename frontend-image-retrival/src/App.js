import './App.css';
import ImageUploader from './components/ImageUploader.jsx';
import Filters from './components/Filters.jsx';
import Results from './components/Results';

function App() {
  return (
    <>
        <div>
          <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600 text-center">Image Aesthetics Retrival</h2>
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
    </>
  );
}

export default App;
