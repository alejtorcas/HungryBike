import { getFirestore, doc } from "firebase/firestore"
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore"
import _ from "lodash"

const firestore = getFirestore()

const UserPermisions = ({user}) => {
    
    const docRef = doc(firestore, `users/${user.id}`)
    const {mutate} = useFirestoreDocumentMutation(docRef)
    
    const togleAdminHandler = () => { mutate({ ..._.omit(user, ["id"]), admin: !user.admin})}

    const togleCheffHandler = () => { mutate({ ..._.omit(user, ["id"]), cheff: !user.cheff})}

    const togleDeliveryHandler = () => { mutate({ ..._.omit(user, ["id"]), delivery: !user.delivery})}

    const togleTelephoneHandler = () => { mutate({ ..._.omit(user, ["id"]), telephone: !user.telephone})}

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button onClick={() => togleCheffHandler(user.id)}>{user.cheff? "✔": "✖"}</button></td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button onClick={() => togleDeliveryHandler(user.id)}>{user.delivery? "✔": "✖"}</button></td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button onClick={() => togleTelephoneHandler(user.id)}>{user.telephone? "✔": "✖"}</button></td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button onClick={() => togleAdminHandler(user.id)}>{user.admin? "✔": "✖"}</button></td>
        </tr>
    )
}

export default UserPermisions