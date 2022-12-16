import { Link } from "react-router-dom";
import axios from 'axios';
import useSwr from 'swr'

const ProductList = () => {
  const fetcher = async () => {
    const response = await axios.get('http://localhost:5000/api/products')
    return response.data;
  }

  const { data } = useSwr('products', fetcher);

  function deleteProduct(e, id) {
    // e.preventDefault();

    axios({
      method: 'delete',
      url: `http://localhost:5000/api/products/${id}`,
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then(res => console.log('respond delete product', res))
    .catch(err => console.log("Error delete product", err))
  }

  if(!data) return <h2>Loading...</h2>

  const resData = data?.data

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <div className="relative shadow rounded-lg mt-3 px-4">
          <Link to={"/add"} className="bg-green-500 hover:bg-green-600 px-5 py-2 mb-3 inline-block shadow-md rounded text-white font-semibold">
            Add New
          </Link>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(resData) && resData.map((value, index) => (
                <tr className="bg-white border-b" key={index}>
                  <td className="py-3 px-1 text-center">1</td>
                  <td className="py-3 px-6 font-medium text-gray-900">{value?.name || "#_ERROR"}</td>
                  <td className="py-3 px-6">{value?.price || "#_ERROR"}</td>
                  <td className="py-3 px-1 text-center">
                    <Link to={`/edit/${value.id}`} className={"font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"}>Edit</Link>
                    <button onClick={(e) => deleteProduct(e, value.id)} className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white mr-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList
