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
        <div className="flex flex-col">
            <h4>Add to Waste Tracking?</h4>
            <form onSubmit={handleDefaultSubmit}className="flex justify-evenly gap-2 items-center">
                <label>Qty:</label>
                <input
                    className="text-black bg-sky-200 h-fit"
                    type="number"
                    min="0"
                    value={wasteQty}
                    onChange={e => setWasteQty(e.target.value)}
                />
                <label>Cost:</label>
                <input
                    className="text-black bg-sky-200 h-fit"
                    type="number"
                    step=".01"
                    min="0"
                    value={wasteCost}
                    onChange={e => setWasteCost(e.target.value)}
                />
                <button className="bg-slate-900 w-fit px-4 py-1 rounded-xl my-2" 
                type="submit"
                onClick={e => handleWasteTrackingSubmit(e, pantryItem.id, buttonSource)} 
                >OK</button>
                <button className="bg-slate-900 w-fit px-5 py-1 rounded-xl my-2" 
                onClick={e => handleSkip(e,pantryItem.id, buttonSource)}
                type="button">Skip</button>
            </form>
        </div>
    )
}}