import { useState } from "react"
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { getFirestore, doc } from "firebase/firestore"
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore";
import Loader from "./Loader";
const firestore = getFirestore()
const storage = getStorage()

const ProductTableRow = ({ product }) => {

    const [image, setImage] = useState("");
    
    getDownloadURL(ref(storage, "products/"+product.name)).then(downloadURL => setImage(downloadURL))

    const { mutate, isLoading } = useFirestoreDocumentDeletion(doc(firestore, "products/"+product.id))
    
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><img src={image} height="60" width="60" /></td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.price}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">{product.ingredients.join(", ")}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                {isLoading && <Loader/>}<button onClick={mutate}type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
            </td>
        </tr>
    )
}

export default ProductTableRow
