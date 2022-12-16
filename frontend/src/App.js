import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddNewProduct from './components/AddNewProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ProductList /> } />
          <Route path='/add' element={ <AddNewProduct /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
