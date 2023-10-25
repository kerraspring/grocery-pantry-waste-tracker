export function CostCalc({ costTotal, wasteTotal }) {
    
    return (
        <>
        
            <h3>Total Spent: ${costTotal.toFixed(2)}</h3>
            <h3>Total Wasted: <span className="text-red-600">- ${wasteTotal.toFixed(2)}</span></h3>
        </>
    )
}