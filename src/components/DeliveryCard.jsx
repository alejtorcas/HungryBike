import { getAuth } from "firebase/auth"
import { getFirestore, doc } from "firebase/firestore"
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore"
import _ from "lodash"
import { useState, useEffect } from "react"

const auth = getAuth()
const firestore = getFirestore()

const DeliveryCard = ({ order }) => {

    const [visibleInputCode, setVisibleInputCode] = useState(false)
    const [code, setCode] = useState("")
    const ref = doc(firestore, "orders", order.id)
    const { mutate } = useFirestoreDocumentMutation(ref)

    const togleVisibleInputCode = () => {
        setVisibleInputCode(prev => !prev)
    }

    const pickUp = () => {
        mutate({ ..._.omit(order, ["id"]), delivery: (order.delivery ? null : auth.currentUser.uid) })
    }

    const confirmChangeHandler = (ev) => {
        setCode(ev.target.value)
    }

    useEffect(() => {
        if (order.deliveryCode === code.toLocaleUpperCase()) {
            mutate({ ...order, delivery: auth.currentUser.uid, deliveryDate: new Date() })
        }
    }, [code])

    return (
        <>

            {order &&
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="flex justify-between">
                        <h5 className="mb-2 mr-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{order.address.town}</h5>
                        <button onClick={pickUp} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{order.delivery ? "Soltar" : "Recoger"}</button>
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-400">{new Date(order.orderDate.seconds*1000).toISOString().replace("T", " - ").substring(0,18)}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{order.address.street} - Nº {order.address.number}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{order.telephone}</p>
                    <p className="text-md font-normal text-gray-700 dark:text-gray-400">{order.deliveryMessage}</p>
                    <div className="flex items-center justify-center mt-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{order.products.reduce((total, product) => total + (product.amount * product.price), 1.50).toFixed(2)}€</span>
                       
                    </div>

                    <div className="flex items-center justify-center  pt-2">
                        {order.delivery &&
                            <button onClick={togleVisibleInputCode} className={"focus:outline-none mt-2 text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 " + (!visibleInputCode
                                ? "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900")
                            }>
                                {visibleInputCode ? "Cancelar" : "Entrgar"}
                            </button>

                        }

                        {visibleInputCode &&
                            <div>
                                <input type="text" onChange={confirmChangeHandler} value={code} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                        }
                    </div>

                </div>
            }
        </>

    )
}

export default DeliveryCard 