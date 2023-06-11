
import { getFirestore, collection, query, where } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { getAuth } from "firebase/auth"
import Loader from "./Loader"

import DeliveryTicket from "./DeliveryTicket"

const firestore = getFirestore()
const auth = getAuth()

const MyOrders = () => {

    const myOrdersRef = query(collection(firestore, "orders"), where("client", "==", auth.currentUser.uid))
    const { data: myOrders, isLoading } = useFirestoreQuery(["myOrders"], myOrdersRef, { subscribe: true }, {
        select: (data) => { return data.docs.map(doc => { return { ...doc.data(), id: doc.id } })}
    })

    return (
        <div className="block max-w p-6 bg-orange-400 border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-70">
            <p className=" text-lg font-medium text-gray-500 md:ml-2 dark:text-gray-400 self-center m-auto">Mis pedidos </p>
            <div className="flex flex-wrap justify-center">

            {isLoading ? <Loader />
                : myOrders && myOrders.length ? myOrders.sort((a, b) => b.orderDate.seconds - a.orderDate.seconds).map(order => <DeliveryTicket key={order.id} order={order} />)
                : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    Aún no has realizado ningún pedido
                </div>
            }
            </div>
        </div>
    )

}

export default MyOrders