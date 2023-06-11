
import { useState, useEffect } from 'react'
import { getFirestore, collection } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import UserPermisions from './UserPermisions'
import Table from './Table'
import Acordion from './Acordion'
import Loader from './Loader'

const firestore = getFirestore()

const ManagePermisions = () => {

    const ref = collection(firestore, "users")
    const { data: users, isLoading } = useFirestoreQuery(["users"], ref, { subscribe: true }, {
        select: (data) => { return data.docs.map(doc => { return { ...doc.data(), id: doc.id } }) }
    })

    return (
        <Acordion title={"Administrar Permisos"}>
            <div className="flex justify-center p-2 border-2 rounded-lg">
                {isLoading ? <div className="self-center"><Loader /> </div> :
                    <Table th={[
                        "Nombre",
                        "Cocinero",
                        "Repartidor",
                        "Teléfono",
                        "Admin"
                    ]}>
                        {users && users.map(user => <UserPermisions user={user} key={user.id} />)}
                    </Table>
                }

            </div>
        </Acordion>

    )


}

export default ManagePermisions