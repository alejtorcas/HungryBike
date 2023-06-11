import { useState, useEffect } from "react"
import { useId } from "../hooks/useId"
import { getStorage, ref, uploadBytes } from "firebase/storage"
const storage = getStorage()
import { getFirestore, doc, setDoc } from "firebase/firestore"
import Acordion from "./Acordion"
const firestore = getFirestore()

const CreateIngredientForm = () => {

    const [image, setImage] = useState("")

    const { generateId } = useId()

    const submitHandler = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value
        const ingredientRef = doc(firestore, `ingredients/${generateId()}`)
        const storageRef = ref(storage, `ingredients/${name}`)
        const img = event.target.elements.image.files[0]
        uploadBytes(storageRef, img).then(() => {
            setDoc(ingredientRef, {
                name: name,
                available: event.target.elements.available.checked,
                image: `ingredients/${name}`
            }).then(() => {
                event.target.reset()
                setImage("")
            })
        })
    }


    return (
        <Acordion title="Registrar Ingrediente">
        <div className="p-2 border-2 rounded-lg"> 
            <h1 className="text-black dark:text-white text-2xl font-bold flex justify-center">Create Ingredient</h1>
            <form onSubmit={submitHandler}>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingredient name</label>
                </div>


                <label className="relative inline-flex items-center cursor-pointer ">
                    <input type="checkbox" name="available" id="available" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Disponible</span>
                </label>

                <div className="flex items-center justify-center w-full">
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
                </div>
                <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Registrar ingrediente</button>
            </form>
        </div>
        </Acordion>
    )
}

export default CreateIngredientForm