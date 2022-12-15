import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ProductList /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
