import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddNewProduct from './components/AddNewProduct';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ProductList /> } />
          <Route path='/add' element={ <AddNewProduct /> } />
          <Route path='/update/:id' element={ <UpdateProduct /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
