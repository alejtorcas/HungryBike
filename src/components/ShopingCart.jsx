import { useId } from "../hooks/useId";
import { useState, useEffect } from "react"
import { getFirestore, doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { getAuth } from "firebase/auth";
import ShopingCartCard from "./ShopingCartCard";

const firestore = getFirestore();

const auth = getAuth();

const ShopingCart = ({from, productsState}) => {

    const [products, setProducts] = productsState;
    const [address, setAddress] = useState({});
    const [total, setTotal] = useState(0)
    const { generateId, generateCode } = useId()
    const [open, setOpen] = useState(false);
    const ref = doc(firestore, "orders", generateId())
    const { mutate } = useFirestoreDocumentMutation(ref)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            fetch(url).then(res => res.json()).then(data => setAddress(data.address))
                .catch((err) => console.log(err))
        })
    }, [])

    function dragOver(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        const droppedItem = JSON.parse(ev.dataTransfer.getData("drag-item"));
        setProducts(prev => {
            const index = prev.findIndex(item => item.name === droppedItem.name)
            if (index === -1) {
                return [...prev, { ...droppedItem, amount: 1 }]
            } else {
                let copy = [...prev]
                copy[index] = { ...copy[index], amount: copy[index].amount + 1 }
                return copy
            }
        })
    }

    const openForm = () => { setOpen(true) }

    const closeForm = () => { setOpen(false) }


    const createOrder = (e) => {
        e.preventDefault()
        from == "user" ?
        mutate({
            products: products.map((product) => { return { ...product, ready: false, cheff: null } }),
            delivery: null,
            client: auth.currentUser.uid,
            readyForDelivery: false,
            deliveryCode: generateCode(),
            orderDate: new Date(),
            deliveryDate: null,
            address: {
                town: e.target.elements.town.value,
                street: e.target.elements.street.value,
                number: e.target.elements.number.value
            },
            telephone: e.target.elements.telephone.value,
            cheffMessage: e.target.elements.cheffMessage.value,
            deliveryMessage: e.target.elements.deliveryMessage.value
        })
        :
        mutate({
            products: products.map((product) => { return { ...product, ready: false, cheff: null } }),
            delivery: null,
            employe: auth.currentUser.uid,
            readyForDelivery: false,
            deliveryCode: generateCode(),
            orderDate: new Date(),
            deliveryDate: null,
            address: {
                town: e.target.elements.town.value,
                street: e.target.elements.street.value,
                number: e.target.elements.number.value
            },
            telephone: e.target.elements.telephone.value,
            cheffMessage: e.target.elements.cheffMessage.value,
            deliveryMessage: e.target.elements.deliveryMessage.value
        })
        setProducts([])
        closeForm()
    }

    useEffect(() => {
        setTotal(products.reduce((total, product) => total + (product.amount * product.price), 1.50).toFixed(2))
    }, [products])

    return (
        <div
            onDragOver={dragOver} onDrop={drop}
            className="m-2 p-2 bg-orange-700 border-2 rounded-lg">
            {products.length === 0 ?
                <div className="p-4 text-center text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    Añade cosas al carrito arrastrando
                </div>
                :
                <>
                    <div className="flex justify-center">
                        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            {products.map((product,i) => <ShopingCartCard key={i} product={product} setProducts={setProducts} />)}
                        </ul>
                    </div>
                    <div className="flex justify-around items-center">
                        <p className="text-2xl font-black text-gray-900 dark:text-white">Subtotal: {total}€ </p>
                        <button onClick={openForm} type="button" className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Hacer pedido</button>
                    </div>
                </>
            }
            <Dialog open={open} onClose={closeForm}  >
                <DialogTitle style={{ background: "black", color: "white" }}>Introduce los datos de entrega</DialogTitle>
                <DialogContent style={{ background: "black" }} >
                    <form onSubmit={createOrder} className="flex-col">
                        <h1 className="text-white flex justify-center">Direción</h1>
                        <div className="relative z-0 w-full mb-6 group">
                            { from=="user" ? <input value={from=="user" ?address.town: ""} onChange={(e) => setAddress(prev => { return { ...prev, town: e.target.value } })} type="text" name="town" id="town" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            : <input type="text" name="town" id="town" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />}                            <label for="town" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ciudad</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            { from=="user" ?<input value={from=="user"?address.road: ""} onChange={(e) => setAddress(prev => { return { ...prev, road: e.target.value } })} type="text" name="street" id="street" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            : <input type="text" name="street" id="street" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />}
                            <label for="street" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Calle</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="number" id="number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número</label>
                        </div>
                        <h1 className="text-white  flex justify-center">Télefono</h1>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="tel" name="telephone" id="telephone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="telephone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Teléfono</label>
                        </div>
                        <div className="flex">
                            <div>
                                <label for="cheffMessage" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles de Preparación</label>
                                <textarea id="cheffMessage" rows="4" className="block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div>
                            <div>
                                <label for="deliveryMessage" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles de Reparto</label>
                                <textarea id="deliveryMessage" rows="4" className="block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <button type="button" onClick={closeForm} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cerrar</button>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>


        </div >
    )

}

export default ShopingCart