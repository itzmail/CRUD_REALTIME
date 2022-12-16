import axios from "axios"
import { useState } from "react"

const AddNewProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [isError, setIsError] = useState(false);
    const [respond, setRespond] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function sendData(e) {
        e.preventDefault();
        setIsLoading(true);
        if (name && price) {
            // axios.post('http://localhost:5000/api/products', { name, price })
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/products',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: { name, price }
            }).then(res => {
                console.log(res);
                if(res.data?.status === 'success') {
                    setIsError(false);
                } else {
                    setIsError(true)    
                }
                setIsLoading(false);
                setRespond(res.data);
            })
            .catch(err => {
                console.log(`Error Send`, err.message);
                setIsError(true);
                setIsLoading(false);
            });
                
        }
    }

    return (
        <div className="relative w-screen md:py-5 flex flex-col items-center">
            <div className=" w-full md:w-1/4">
                {respond && (
                    <div className={`w-full ${isError ? 'bg-red-400' : 'bg-green-400'} ${respond ? 'opacity-100 inline-block' : 'opacity-0 hidden'} p-3 mb-3 rounded-md shadow-md text-white`}>
                        <h2>{respond?.message || "#_NO_MESSAGE"}</h2>
                    </div>
                )}
                <div className="bg-slate-100 w-full shadow-md rounded-md p-4">
                    <div className="flex w-full justify-center">
                        <h2 className="text-xl font-semibold">Add New Product</h2>
                    </div>
                    <form onSubmit={sendData}>
                        <FormInput type={'text'} onChange={e => setName(e.target.value)} label={'Nama Produk : '} placeholder={"Nama Produk Baru"} />
                        <FormInput type={'number'} onChange={e => setPrice(e.target.value)} label={'Harga Produk : '} placeholder={"Harga Produk Baru"} />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>{isLoading ? 'Loading...' : 'Add Product'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const FormInput = ({ label, onChange, type, placeholder, isRequired, value }) => {
    return (
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type={type} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={isRequired} onChange={onChange} />
        </div>
    )
}

export default AddNewProduct;