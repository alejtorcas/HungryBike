import React, { useState } from "react"
import firebaseApp from "../firebase/credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"

export const Login = () => {
    const auth = getAuth(firebaseApp)
    const firestore = getFirestore()

    const [isRegister, setIsRegister] = useState(false);

    const toggleIsRegister = () => {
        document.querySelectorAll("form").forEach(form => form.reset())
        setIsRegister(prev => !prev)
    }

    async function registerUser(email, password, name) {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password).then((firebaseUser) => firebaseUser)
        const documentRef = doc(firestore, `users/${userInfo.user.uid}`)
        setDoc(documentRef, { name: name, admin: false, cheff: false, delivery: false, telephone: false })
    }

    function submitHandler(event) {
        event.preventDefault()
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value
        if (isRegister) {
            console.log("registro")
            const name = event.target.elements.name.value
            registerUser(email, password, name)
        } else {
            console.log("login")
            signInWithEmailAndPassword(auth, email, password)
        }
    }

    return (
        <section className="bg-gray-600 h-screen" style={{ backgroundImage: "url('/loginBG.jpg')" }}>
            <nav className="bg-orange-600 border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <img src="/logo.PNG" className="h-16 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hungry Bike</span>
                    </div>
                </div>
            </nav>
            <div className="flex justify-center mt-10">
                {
                    isRegister
                        ?
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <form className="space-y-6" onSubmit={submitHandler}>
                                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in Hungry Bike</h5>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name Surname" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Do you already have an account? <button onClick={toggleIsRegister} className="text-blue-700 hover:underline dark:text-blue-500">Log in</button>
                                </div>
                            </form>

                        </div>

                        :
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <form className="space-y-6" onSubmit={submitHandler}>
                                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Log in Hungry Bike</h5>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Not registered? <button onClick={toggleIsRegister} className="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
                                </div>
                            </form>
                        </div>

                }
            </div>
        </section>
    )
}