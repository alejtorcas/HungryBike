
import ProductCard from "./ProductCard"

const DeliveryTicket = ({ order }) => {

    const percent = () => {
        if (order.deliveryDate != null) return 100
        if (order.delivery != null ) return 80
        if (order.readyForDelivery == true) return 60
        if (order.products.every(product => product.ready == true)) return 40
        if (order.products.some(product => product.ready == true)) return 20
        else return 0
    }

    const percentMessage = () => {
        if (order.deliveryDate != null) return "Tu pedido ya se ha entregado"
        if (order.delivery != null ) return "Tu pedido viene de camino"
        if (order.readyForDelivery == true) return "Tu pedido ya esta listo para recoger por el repartidor"
        if (order.products.every(product => product.ready == true)) return "Tu pedido esta casi listo"
        if (order.products.some(product => product.ready == true)) return "Tu pedido esta siendo preparado"
        else return "Gracias por realizar tu pedido, presta atención al estado del pedido aquí"
    }

    return (

        <div className="bg-white border-2 border-gray-300 p-4 rounded-lg flex flex-wrap justify-around mt-2 w-max ">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Detalles del pedido</h2>
                <p>Fecha de pedido: {new Date(order.orderDate.seconds * 1000).toISOString().replace("T", " - ").substring(0, 18)}</p>
                {order.deliveryDate && <p>Fecha de entrega: {new Date(order.deliveryDate.seconds * 1000).toISOString().replace("T", " - ").substring(0, 18)}</p>}
                <p>Direeción: {order.address.town + ", " + order.address.street + ", " + order.address.number}</p>
                <p>Telephone: {order.telephone}</p>
                {order.deliveryMessage && <p>Mensaje para el repartidor: {order.deliveryMessage}</p>}
                <p>Codigo de entrega: {order.deliveryCode}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-bold">Productos</h3>

                <ul>
                    <li>{order.cheffMessage}</li>
                    {order.products.map((product) => (
                        <li key={product.name}>
                            {product.amount} x {product.name}: {product.price}€
                        </li>
                    ))}
                    <li>Total: {order.products.reduce((total, prod) => total + (prod.amount * prod.price), 1.5).toFixed(2)}€</li>
                </ul>
            </div>

            <div className="w-full h-6 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 ">
                <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-center" style={{width: percent()+"%"}}></div>
                <div className="text-center text-lg">{ percentMessage() }</div>
            </div>
        </div>
    )
}

export default DeliveryTicket