import { useEffect, useState } from "react"
import { getFirestore, doc, setDoc, collection, query, where } from "firebase/firestore"
import { useId } from "../hooks/useId"
import Acordion from "./Acordion"
import SelectIngredient from "./SelectIngredient"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { ref, getStorage, uploadBytes } from "firebase/storage"
const firestore = getFirestore()
const storage = getStorage()

const CreateProductForm = () => {

    const { generateId } = useId()

    const [image, setImage] = useState("")
    const [ingredients, setIngredients] = useState([""])


    const productsRef = collection(firestore, "products")
    const { data: categories } = useFirestoreQueryData(
        ["extractCategories"],
        productsRef,
        { subscribe: true },
        {
            select(data) {
                return Array.from(new Set(data.map(product => product.category)))
            }
        }
    )

    const ingredientsRef = collection(firestore, "ingredients")
    const { data: ingredientList } = useFirestoreQueryData(
        ["ingredientList"],
        ingredientsRef,
        {subscribe: true },
        {
            select(data) {
                return data.map(ingredient => ingredient.name).sort()
            }
        }
    )

    const createProduct = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value
        const documentRef = doc(firestore, `products/${generateId()}`)
        const storageRef = ref(storage, `products/${name}`)
        const img = event.target.elements.image.files[0]
        uploadBytes(storageRef,img).then(res => {
            setDoc(documentRef, {
                name: event.target.elements.name.value,
                price: event.target.elements.price.value,
                category: event.target.elements.category.value,
                ingredients:  [...ingredients.map((ing, i) => event.target.elements["ingredient" + i].value)]
            }).then(() => {
                event.target.reset()
                setIngredients([""])
                setImage("")
            })
        })
    }

    const addIngredient = () => {
        setIngredients(prev => [...prev, ""])
    }

    return (
        <Acordion title="Crear Producto">
            <div className="p-2 border-2 rounded-lg">
                <h1 className="text-black dark:text-white text-2xl font-bold flex justify-center">Create Product</h1>
                <form onSubmit={createProduct}>
                    <div className="flex flex-wrap mt-2">
                        <div className="relative z-0 w-full lg:w-1/3 mb-6 group p-2">
                            <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product name</label>
                        </div>
                        <div className="relative z-0 w-full lg:w-1/3 mb-6 group p-2">
                            <input type="number" step="0.01" min="0.01" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                        </div>
                        <div className="relative z-0 w-full lg:w-1/3 mb-6 group p-2">
                            <input type="text" name="category" id="category" autoComplete="on" list="categories" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
                            <datalist id="categories">
                                {categories && categories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                            </datalist>
                        </div>
                    </div>
                    <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {image
                            ?
                            <img src={image} name="prevImage" id="prevImage" className="h-3/4 w-2/4" />
                            :
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                            </div>}
                        <input
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))} type="file"
                            className="hidden"
                        />
                    </label>

                    <div className="flex flex-wrap justify-center">
                        {ingredientList && ingredients.map((ingredient, i) =>
                            <SelectIngredient key={i} state={[ingredients, setIngredients]} options={ingredientList} index={i} />
                        )}
                    </div>
                    <button type="button" onClick={addIngredient} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Añadir Ingrediente</button>
                    <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Registrar producto</button>
                </form>
            </div>
        </Acordion>
    )
}



export default CreateProductForm