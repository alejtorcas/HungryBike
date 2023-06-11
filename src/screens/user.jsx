import CreateOrder from "../components/CreateOrder"
import MyOrders from "../components/MyOrders"
import Loader from "../components/Loader"
import { useEffect } from "react"

const User = () => {
    return (
        <>
            <CreateOrder from={"user"}/>
            <MyOrders/>  
        </>
    )
}

export default User