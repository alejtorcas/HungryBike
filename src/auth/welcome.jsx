import { useEffect, useState } from "react";
import { doc, getFirestore } from "firebase/firestore";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { getAuth } from "firebase/auth"

import ScreenSelector from "../components/ScreenSelector";

import User from "../screens/user";
import Cheff from "../screens/cheff";
import Delivery from "../screens/delivery";
import Telephone from "../screens/telephone";
import Admin from "../screens/admin";

const auth = getAuth()

export const Welcome = () => {

    const [Screen, setScreen] = useState("User")
    const [permits, setPermits] = useState(["User"]);

    const firestore = getFirestore()
    const userRef = doc(firestore, "users", auth.currentUser.uid)
    // const {data: user, isLoading, isError, refetch} = useFirestoreDocumentData(["users", auth.currentUser.uid], userRef)
    const data = useFirestoreDocumentData(["users", auth.currentUser.uid], userRef)

    useEffect(() => {
        const user = data.data

        if (user) {

            let permits = ["User"]
            user.cheff && permits.push("Cheff")
            user.delivery && permits.push("Delivery")
            user.telephone && permits.push("Telephone")
            user.admin && permits.push("Admin")
            setPermits(permits)
        }
    }, [data.data])

    const render = () => {
        switch (Screen) {
            case "User": return <User />
            case "Telephone": return <Telephone />
            case "Cheff": return <Cheff />
            case "Delivery": return <Delivery />
            case "Admin": return <Admin />
            default: return <User />
        }
    }

    return (
        <div className="bg-orange-300 dark:bg-slate-800 min-h-screen">
            <ScreenSelector options={permits} selected={Screen} setSelected={setScreen} queryData={data} />
            <div className="container m-auto w-5/6 my-2">
                {render()}
            </div>
        </div>
    )
} 