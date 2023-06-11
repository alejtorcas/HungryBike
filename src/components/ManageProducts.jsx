import Table from "./Table"
import Acordion from "./Acordion"
import { getFirestore, collection } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import Loader from "./Loader"
import ProductTableRow from "./ProductTableRow"
const firestore = getFirestore()

const ManageProducts = () => {

    const productsRef = collection(firestore, "products")
    const { data: products, isLoading } = useFirestoreQuery(["ManageProducts"], productsRef, { subscribe: true },
        {
            select: (data) => { return data.docs.map(doc => { return { ...doc.data(), id: doc.id } }) }
        })

    return (
        <Acordion title="Gestionar Productos">
            <div className="flex justify-center p-2 border-2 rounded-lg">
                {isLoading ? <div className="self-center"><Loader /> </div>
                    : products.length ?
                        <Table th={["Imagen", "Nombre", "Precio", "Ingredientes", "Opciones"]}>
                            {products.map(prod => <ProductTableRow key={prod.id} product={prod} />)}
                        </Table>
                        :
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            No hay productos aún
                        </div>
                }
            </div>
        </Acordion>
    )
}

export default ManageProducts