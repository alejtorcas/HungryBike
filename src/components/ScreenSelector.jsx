import { useState } from "react"
import Loader from "./Loader"
import { getAuth, signOut } from "firebase/auth"

const auth = getAuth()

const ScreenSelector = ({options, selected, setSelected, queryData}) => {

    const [hidden, setHidden] = useState(true)
    const {isLoading, isError, refetch, isRefetching} = queryData

    return (    
        <nav className="bg-orange-600 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <img src="/logo.PNG" className="h-16 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hungry Bike</span>
                </div>
                <button onClick={() => setHidden(prev => !prev)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-lime-600 rounded-lg md:hidden hover:bg-lime-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="w-full md:block md:w-auto" id="navbar-default" hidden={hidden}>
                    <ul className="font-medium flex flex-col p-4 md:p-2 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-orange-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {options.map((option, i) => {return (
                            <li key={i}>
                                <button 
                                    onClick={() => setSelected(option)} 
                                    className={(
                                        selected === option 
                                        ? "block text-xl py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-green-500"
                                        : "block text-xl py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
                                    )}
                                >
                                    {option}
                                </button>
                            </li>
                        )})}
                        {isLoading || isRefetching && <Loader/>}
                        {isError &&
                            <button 
                                onClick={refetch} 
                                className="block text-xl py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-red-500"
                            >
                                Recargar
                            </button>
                        }
                        <li>
                            <button 
                                onClick={() => signOut(auth)} 
                                className="block text-xl py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default ScreenSelector