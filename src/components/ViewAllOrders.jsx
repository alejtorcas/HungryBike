import Acordion from "./Acordion"
import { getFirestore, collection } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import Loader from "./Loader"
import DeliveryTicket from "./DeliveryTicket"
const firestore = getFirestore()

const ViewAllOrders = () => {

    const { data: orders , isLoading} = useFirestoreQuery(["allOrders"], collection(firestore, "orders"), {subscribe: true}, 
    {
        select: (data) => {return data.docs.map(doc => {return {...doc.data()}})}
    })

    return <Acordion title={"Todos los pedidos"}>
         <div className="flex flex-wrap justify-center p-2 border-2 rounded-lg">
         {isLoading ? <Loader />
                : orders.length ? orders.sort((a, b) => b.orderDate.seconds - a.orderDate.seconds).map(order => <DeliveryTicket key={order.id} order={order} />)
                : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    Aún no hay ningún pedido
                </div>
            }
            </div>
    </Acordion>
}

export default ViewAllOrders