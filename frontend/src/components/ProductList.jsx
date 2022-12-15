const ProductList = () => {
  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <div className="relative shadow rounded-lg mt-3">
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
                    <tr className="bg-white border-b">
                        <td className="py-3 px-1 text-center">1</td>
                        <td className="py-3 px-6 font-medium text-gray-900">Product 1</td>
                        <td className="py-3 px-6">435</td>
                        <td className="py-3 px-1 text-center"></td>
                    </tr>
                </tbody>
             </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList
