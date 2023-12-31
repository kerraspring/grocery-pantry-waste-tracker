export function CostCalc({ costTotal, wasteTotal }) {
    
    return (
        <div className="border border-white h-fit w-fit py-2 px-2.5 grid grid-cols-2 justify-items-center">
        
            <h3 className="mx-2">Total Spent:</h3>
            <h3 className="mx-2">Total Wasted:</h3>
            <span  className="bg-dark-blue w-fit px-2 py-1 rounded-xl my-2"> ${costTotal.toFixed(2)}</span>
            <span  className="bg-red w-fit px-2 py-1 rounded-xl my-2">- ${wasteTotal.toFixed(2)}</span>
        </div>
    )
}