export function CostCalc({ costTotal, wasteTotal }) {
    
    return (
        <>
        
            <h3>Total Spent: ${costTotal.toFixed(2)}</h3>
            <h3>Total Wasted: - ${wasteTotal.toFixed(2)}</h3>
        </>
    )
}