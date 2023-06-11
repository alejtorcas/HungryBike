
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import DeliveryCard from "./DeliveryCard"
import Loader from "./Loader"

const firestore = getFirestore()
const auth = getAuth()

const MyDeliverys = () => {

    const ref = query(collection(firestore, "orders"), where("delivery", "==", auth.currentUser.uid), where("deliveryDate", "==", null))
    const { data: orders, isLoading } = useFirestoreQuery(["myDeliverys"], ref, { subscribe: true }, {
        select: (data) => { return data.docs.map(doc => { return { ...doc.data(), id: doc.id } }) }
    })



    return (
        <div className="block max-w p-6 bg-orange-400 border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-70">
            <p className=" text-lg font-medium text-gray-500 md:ml-2 dark:text-gray-400 self-center m-auto mb-2">Mis repartos </p>
            <div className="flex flex-wrap justify-center">
                {isLoading ? <Loader />
                    : orders.length ? orders.sort((a, b) => a.orderDate.seconds - b.orderDate.seconds ).map((order) => <DeliveryCard key={order.id} order={order} />)
                        : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            No tienes repartos asignados aún
                        </div>
                }


            </div>

        </div>
    )

}

export default MyDeliverys