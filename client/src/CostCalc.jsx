export function CostCalc({ costTotal, wasteTotal }) {
    
    return (
        <div className="border border-white h-fit w-fit py-2 px-2.5 flex justify-evenly">
        
            <h3 className="mx-2">Total Spent: <span  className="bg-slate-900 w-fit px-2 py-1 rounded-xl my-2"> ${costTotal.toFixed(2)}</span></h3>
            <h3 className="mx-2">Total Wasted: <span  className="bg-red-900 w-fit px-2 py-1 rounded-xl my-2">- ${wasteTotal.toFixed(2)}</span></h3>
        </div>
    )
}