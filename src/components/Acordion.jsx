import { useState } from "react"

const Acordion = ({children, title}) => {

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div>
            <h2>
                <button className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" 
                    onClick={() => setCollapsed(prev => !prev)} 
                >
                    <span>{title}</span>
                    <svg className={"w-6 h-6 shrink-0 " + (collapsed ? "rotate-180" : "rotate-0")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </h2>
            {!collapsed &&
            <div>
                {children}
            </div>
            }
        </div>
    )
}

export default Acordion