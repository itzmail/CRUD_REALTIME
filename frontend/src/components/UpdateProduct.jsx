import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from 'react-router-dom';
import { FormInput } from "./AddNewProduct";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [respond, setRespond] = useState(null);
    const [idItem, setIdItem] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataGet, setDataGet] = useState(null);

    const params = useParams();

    useEffect(() => {
        getFirstData();
    }, [])

    function getFirstData() {
        console.log(`Params`, params);
        if (params) {
            setIdItem(params?.id);
            axios.get(`http://localhost:5000/api/products/${params?.id}`)
                .then(res => {
                    const status = res.data?.status;
                    const data = res.data?.data;
                    console.log(res.data)
                    if (status === 'success') {
                        setDataGet(data);
                        setName(data?.name);
                        setPrice(data?.price);
                    }
                })
                .catch(err => console.log(`Error`, err))
        }
    }

    function sendData(e) {
        console.log(`Format`, { name, price, method: '_put' })
        e.preventDefault();
        setIsLoading(true);
        if (name && price) {
            // axios.post('http://localhost:5000/api/products', { name, price })
            axios({
                method: 'post',
                url: `http://localhost:5000/api/products/${idItem}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: { name, price, method: '_put' }
            }).then(res => {
                console.log(res);
                if (res.data?.status === 'success') {
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
                    <div className="flex w-full justify-center mb-5">
                        <h2 className="text-xl font-semibold">Update Product {dataGet?.name}</h2>
                    </div>
                    <form onSubmit={sendData}>
                        <FormInput type={'text'} onChange={e => setName(e.target.value)} label={'Nama Produk : '} placeholder={"Nama Produk Baru"} value={name} />
                        <FormInput type={'number'} onChange={e => setPrice(e.target.value)} label={'Harga Produk : '} placeholder={"Harga Produk Baru"} value={price} />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Edit Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;