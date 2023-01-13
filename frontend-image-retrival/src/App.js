import './App.css';
import ImageUploader from './components/ImageUploader.jsx';
import Filters from './components/Filters.jsx';

function App() {
  return (
    <>
        <div class="flex flex-row bg-gray-50">
          <div class="basis-1/2">
            <ImageUploader/>
          </div>
          <div class="basis-1/2">
            <Filters/>
          </div>
        </div>
    </>
  );
}

export default App;
