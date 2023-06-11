import "../css/ProductCard.css"
import { useState } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
const storage = getStorage()

const ProductCard = ({ product, setProducts }) => {

    const [img, setImage] = useState("")

    const addProductHandler = (product) => {
        setProducts(prev => {
            const index = prev.findIndex(item => item.name === product.name)
            if (index === -1) {
                return [...prev, { ...product, amount: 1 }]
            } else {
                let copy = [...prev]
                copy[index] = { ...copy[index], amount: copy[index].amount + 1 }
                return copy
            }
        })
    }

    function startDrag(ev) {
        ev.dataTransfer.setData("drag-item", JSON.stringify(product));
    }

    getDownloadURL(ref(storage, "products/" + product.name)).then(downloadURL => setImage(downloadURL))


    return (
        <div className="card" draggable onDragStart={startDrag}>
            <div className="content">
                <div className="back">
                    <div className="back-content">
                        <strong>{product.name}</strong>
                    </div>
                </div>
                <div className="front">
                    {img ? <div className="img" style={{ backgroundImage: `url(${img})` }}></div> :
                        <>
                            <div className="circle">
                            </div>
                            <div className="circle" id="right">
                            </div>
                            <div className="circle" id="bottom">
                            </div>
                        </>
                    }

                    <div className="front-content">
                        <div className="flex justify-between">
                            <small className="badge text-xl">{product.price}€</small>
                            <button onClick={() => addProductHandler(product)} type="button" class="text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>
                        </div>
                        <div className="description">
                            <div className="title">
                                <p className="title flex flex-wrap">
                                    {product.ingredients.map(ing => <strong key={ing}>{ing}</strong>)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard