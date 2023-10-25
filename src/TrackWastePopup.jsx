import { useState } from "react"

export function TrackWastePopup({ open, handleDelete, pantryItem, setWasteTotal, setSelectedPantryItem, handleMoveToGrocList, buttonSource }  ) {

    const [wasteQty, setWasteQty] = useState("")
    const [wasteCost, setWasteCost] = useState (pantryItem.cost ? pantryItem.cost : "")

    const handleDefaultSubmit = (e) => {
        e.preventDefault()
    }

    function handleWasteTrackingSubmit(e, pantryItemId, buttonSource) {
        e.preventDefault()

        const itemWasteCost = parseInt(wasteQty, 10) * parseFloat(wasteCost)
        
        setWasteTotal(currentWasteTotal => {
            const numCurrentWasteTotal = parseFloat(currentWasteTotal)
            return numCurrentWasteTotal + itemWasteCost
        })

        if (buttonSource === "addToList") {
            handleMoveToGrocList(pantryItemId)
        } else if (buttonSource === "delete") {
            handleDelete(pantryItemId, "pantry")
        }
        setSelectedPantryItem(false)
    }

    function handleSkip(e, pantryItemId, buttonSource) {
        e.preventDefault()

        if (buttonSource === "addToList") {
            handleMoveToGrocList(pantryItemId)
        } else if (buttonSource === "delete") {
            handleDelete(pantryItemId, "pantry")
        }
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
                <button
                type="submit"
                onClick={e => handleWasteTrackingSubmit(e, pantryItem.id, buttonSource)} 
                >OK</button>
                <button
                onClick={e => handleSkip(e,pantryItem.id, buttonSource)}
                type="button">Skip</button>
            </form>
        </>
    )
}}