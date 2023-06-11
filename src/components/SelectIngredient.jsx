

const SelectIngredient = ({ state, index, options }) => {
    const [ingredients, setIngredients] = state

    const deleteIngredient = (index) => {
        const copy = [...ingredients]
        copy.splice(index, 1);
        setIngredients(copy)
    }

    const selectIngredient = (index, option) => {
        const copy = [...ingredients]
        copy.replace(index, option);
        setIngredients(copy)
    }

    return (
        <div className="flex items-center justify-center">
            <select id={`ingredient${index}`}  name={`ingredient${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Elige el ingrediente</option>
                {options && options.map((option,i) => <option value={option} onClick={() => selectIngredient(i,option)} key={option}>{option}</option>)}
            </select>
            <button type="button" onClick={() => deleteIngredient(index)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
            </button>
        </div>
    )
}

export default SelectIngredient