export function CostCalc({ costTotal, wasteTotal }) {
    
    return (
        <div className="border border-white h-fit">
        
            <h3>Total Spent: ${costTotal.toFixed(2)}</h3>
            <h3>Total Wasted: <span className="text-red-600">- ${wasteTotal.toFixed(2)}</span></h3>
        </div>
    )
}