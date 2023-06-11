import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { getFirestore, collection, where, query } from "firebase/firestore"
import DeliveryCard from "./DeliveryCard"
import Loader from "./Loader"

const firestore = getFirestore()
const ref = query(collection(firestore, "orders"), where("readyForDelivery", "==", true), where("delivery", "==", null))

const PickUpOrders = () => {

    const { data: orders, isLoading } = useFirestoreQuery(["pickUpOrders"], ref, { subscribe: true },
        {
            select: (data) => { return data.docs.map(doc => { return { ...doc.data(), id: doc.id } }) }
        }
    )

    return (
        <div className="block max-w p-6 bg-orange-400 border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-70">
            <p className=" text-lg font-medium text-gray-500 md:ml-2 dark:text-gray-400 self-center m-auto mb-2">Pedidos listos para reparto </p>
            <div className="flex flex-wrap justify-center">    
                {isLoading ? <Loader /> :
                    orders.length ? orders.sort((a, b) => a.orderDate.seconds * 1000 - b.orderDate.seconds * 1000).map(order => <DeliveryCard key={order.id} order={order} />) : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        No hay repartos aún
                    </div>}

            </div>
        </div>
    )
}

export default PickUpOrders