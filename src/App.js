import logo from './logo.svg';
import Routes from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
  <>
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>  
  </>
  );
}

export default App;
