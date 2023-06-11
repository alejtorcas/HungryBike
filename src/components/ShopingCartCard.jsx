import { useState } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Loader from "./Loader"
const storage = getStorage()

const ShopingCartCard = ({ product, setProducts }) => {

    const [img, setImg] = useState("")
    getDownloadURL(ref(storage, `products/${product.name}`)).then((downloadURL) => setImg(downloadURL)).catch(() => setImg("https://static.vecteezy.com/system/resources/thumbnails/007/973/112/small/hamburger-soft-drink-and-french-fries-fast-food-icon-sign-outline-flat-design-on-white-background-free-vector.jpg"))

    const minus = () => {
        setProducts(prev => {
            const index = prev.findIndex(prod => prod.name === product.name)
            let copy = [...prev]
            if (copy[index].amount === 1) {
                copy.splice(index, 1)
                return copy
            } else {
                copy[index] = { ...copy[index], amount: copy[index].amount - 1 }
                return copy
            }
        })
    }

    const plus = () => {
        setProducts(prev => {
            const index = prev.findIndex(prod => prod.name === product.name)
            let copy = [...prev]
            copy[index] = { ...copy[index], amount: copy[index].amount + 1 }
            return copy
        })
    }

    return (
        <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {img ? <img className="w-8 h-8 rounded-full" src={img} /> : <Loader />}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {product.name}
                    </p>
                    <div className="flex justify-between mt-1">
                        <button onClick={() => minus()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                        </button>
                        <p className="text-md text-gray-500 truncate dark:text-gray-400 ">{product.amount}</p>
                        <button onClick={() => plus()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {(product.price * product.amount).toFixed(2)}€
                </div>
            </div>
        </li>
    )
}

export default ShopingCartCard