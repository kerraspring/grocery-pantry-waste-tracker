import { useState } from "react"

export function TrackWastePopup({ open, handleDelete, pantryItem, setWasteTotal, setSelectedPantryItem }  ) {

    const [wasteQty, setWasteQty] = useState("")
    const [wasteCost, setWasteCost] = useState (pantryItem.cost)

    const handleDefaultSubmit = (e) => {
        e.preventDefault()
    }

    const handleWasteTrackingSubmit = (e) => {
        e.preventDefault()

        const itemWasteCost = parseInt(wasteQty, 10) * parseFloat(wasteCost)
        
        

        setWasteTotal(currentWasteTotal => {
            const numCurrentWasteTotal = parseFloat(currentWasteTotal)
            return numCurrentWasteTotal + itemWasteCost
        })

        handleDelete(pantryItem.id, "pantry")
        setSelectedPantryItem(false)
    }

    if (!open) {
        return null
    }else {

    return (
        <>
            <h4>Add to Waste Tracking?</h4>
            <form onSubmit={handleDefaultSubmit}>
                <label>Qty</label>
                <input
                    type="number"
                    min="0"
                    value={wasteQty}
                    onChange={e => setWasteQty(e.target.value)}
                />
                <label>Cost</label>
                <input
                    type="number"
                    step=".01"
                    min="0"
                    value={wasteCost}
                    onChange={e => setWasteCost(e.target.value)}
                />
                <button type="submit" onClick={handleWasteTrackingSubmit} 
                >OK</button>
                <button onClick={() => handleDelete(pantryItem.id, "pantry")}type="button">Skip & Just Delete</button>
            </form>
        </>
    )
}}