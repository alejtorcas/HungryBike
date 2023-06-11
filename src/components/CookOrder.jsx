import ProductCard from "./ProductCard"
import { getFirestore, doc } from "firebase/firestore"
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore"
import { getAuth } from "firebase/auth"
import CheffProductCard from "./CheffProductCard"

const firestore = getFirestore()
const auth = getAuth()


const CookOrder = ({ order }) => {

    const ref = doc(firestore, "orders", order.id)
    const { mutate } = useFirestoreDocumentMutation(ref)

    const togleReady = (i) => {
        let orderCopy = { ...order, products: order.products.map((product, idx) => i == idx ? { ...product, ready: !product.ready, cheff: (product.cheff ? null : auth.currentUser.uid) } : product) }
        mutate(orderCopy)
    }

    const setReadyForDelivery = () => {
        mutate({ ...order, readyForDelivery: true })
    }

    return (
        <div>


            <div className="bg-gray-500 m-2 p-2 flex flex-wrap rounded-lg">
                {order.cheffMessage &&
                    <div className="flex w-full p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div className="flex">
                            {order.cheffMessage} - {order.telephone}
                        </div>
                    </div>}

                {order.products.map((product, i) => <CheffProductCard product={product} togleReady={() => togleReady(i)} key={i} />)}
            </div>
            <div className="flex justify-center">
                {order.products.findIndex(product => !product.ready) == -1 &&
                    <button onClick={() => setReadyForDelivery()} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Listo
                        </span>
                    </button>

                }
            </div>
        </div>
    )
}

export default CookOrder
