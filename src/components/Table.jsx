
const Table = ({ th, children}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {th.map((label, index) => 
                            <th key={label+index} scope="col" className="px-6 py-3">
                                {label}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>

    )
}

export default Table