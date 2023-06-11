import { getFirestore, collection } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import IngredientTableRow from "./IngredientTableRow"
import Acordion from "./Acordion"
import Table from "./Table"
import Loader from "./Loader"
const firestore = getFirestore()

const ManageIngredients = () => {

    const ingredientsRef = collection(firestore, "ingredients")
    const { data: ingredients, isLoading } = useFirestoreQuery(["ingredients"], ingredientsRef, { subscribe: true },
        {
            select: (data) => { return data.docs.map(doc => { return { ...doc.data(), id: doc.id } }) }
        }
    )

    return (
        <Acordion title={"Gestionar Ingredinetes"}>
            <div className="flex justify-center p-2 border-2 rounded-lg">
                {isLoading ? <div className="self-center"><Loader /></div>
                    : ingredients.length ?
                        <Table th={["Imagen", "Nombre", "Disponible"]}>
                            {ingredients.map(ing => <IngredientTableRow key={ing.id} ingredient={ing} />)}
                        </Table>
                        :
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            No hay ingredientes aún
                        </div>
                }
            </div>
        </Acordion>

    )

}

export default ManageIngredients