const CheffProductCard = ({ product, togleReady }) => {
    return (
        <div className="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {product.amount} - {product.name}</h5>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
            <button onClick={togleReady} className={"focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 " + (!product.ready
                ? "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900")
            }>
                {product.ready ? "Cancel" : "Ready"}
            </button>
        </div>

    )
}

export default CheffProductCard