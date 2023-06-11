import { getFirestore, collection, query, where } from "firebase/firestore"
import { useFirestoreQuery, useFirestoreQueryData } from "@react-query-firebase/firestore"
import { useEffect, useState } from "react"
import ShopingCart from "./ShopingCart"
import ProductCard from "./ProductCard"
import Acordion from "./Acordion"
import Loader from "./Loader"

const firestore = getFirestore()

const CreateOrder = ({ from }) => {

    const productsState = useState([])

    const ingRef = query(collection(firestore, "ingredients"), where("available", "==", true))
    const { data: ingredients } = useFirestoreQueryData(
        ["availableIngredients"],
        ingRef,
        { subscribe: true },
        {
            select: (snapshot) => snapshot.map(ing => ing.name)
        }
    )

    const ref = query(collection(firestore, "products"))
    const { data, isLoading } = useFirestoreQuery(
        ["products"],
        ref,
        { subscribe: true },
        {
            select: (snapshot) => {
                const products = snapshot.docs.map(doc => doc.data())
                const categories = Array.from(new Set(
                    (products.map(prod => prod.category))
                ))
                return categories.map(c => {
                    return {
                        category: c.charAt(0).toUpperCase() + c.slice(1),
                        products: products.filter(prod => prod.category === c)
                    }
                })
            }
        }
    )

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        data && ingredients &&
            setCategories(data.map(cat => {
                return {
                    ...cat, products: cat.products.filter(product =>
                        product.ingredients.every(ing => ingredients.includes(ing))
                    )
                }
            }).filter(cat => cat.products.length > 0))
    }, [data, ingredients])

    return (
        <div className="block max-w p-6 bg-orange-400 border border-gray-200 rounded-lg shado dark:bg-gray-800 dark:border-gray-70">
            <p className=" text-lg font-medium text-gray-500 md:ml-2 dark:text-gray-400 self-center m-auto">Haz tu pedido </p>
                <div className="flex flex-col justify-center">
                <ShopingCart from={from} productsState={productsState} />
                {isLoading ? <div className="self-center"><Loader/></div> : categories.length ?
                    categories.map((cat, i) =>
                        <Acordion title={cat.category} key={i} >
                            <div className="flex flex-wrap justify-center m-5">
                                {cat.products.map((product, i) =>
                                    <ProductCard key={i} product={product} setProducts={productsState[1]} />
                                )}
                            </div>
                        </Acordion>
                    )
                    :
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 self-center" role="alert">
                        No hay productos disponibles, sentimos las
                    </div>
                }
            </div>
        </div>
    )
}

export default CreateOrder