import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import './styles/homepage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <Routes>
          <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
