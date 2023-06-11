import { useState } from "react"
import { getStorage, ref , getDownloadURL } from "firebase/storage"
const storage = getStorage()
import { getFirestore, doc } from "firebase/firestore"
const firestore = getFirestore()
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore"

const IngredientTableRow = ({ingredient}) => {

    const [image, setImage] = useState("");
    
    getDownloadURL(ref(storage, ingredient.image)).then(downloadURL => setImage(downloadURL))
    
    const docRef = doc(firestore, `ingredients/${ingredient.id}`)

    const { mutate } = useFirestoreDocumentMutation(docRef)

    const togleAvailable = () => {
        mutate({
            ...ingredient,
            available: !ingredient.available
        })
    }

    return (
        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><img src={image} height="40" width="40"/></td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ingredient.name}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button onClick={togleAvailable}>{ingredient.available ? "✔": "✖"}</button></td>
        </tr>
    )
}

export default IngredientTableRow