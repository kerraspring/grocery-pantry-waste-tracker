import { useState } from "react"

export function CheckOffPopup({grocItemId, handleAddQtyAndCost, setSelectedGrocItem }) {

    const [qty, setQty] = useState("")
    const [cost, setCost] = useState ("")

    const handleDefaultSubmit = (e) => {
        e.preventDefault()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAddQtyAndCost(grocItemId, qty, cost)
        setSelectedGrocItem(false)
    }

    const handleSkip = (e) => {
        e.preventDefault()
        handleAddQtyAndCost(grocItemId, 0, 0)
        setSelectedGrocItem(false)
    }

    return (
        <>
            <form onSubmit={handleDefaultSubmit} className="flex justify-evenly gap-2 items-center">
                <label>Qty:</label>
                <input
                    className="text-black bg-sky-200 h-fit"
                    type="number"
                    min="0"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                />
                <label>Cost:</label>
                <input
                    className="text-black bg-sky-200 h-fit"
                    type="number"
                    step=".01"
                    min="0"
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                />
                <button className="bg-slate-900 w-fit px-4 py-1 rounded-xl my-2" type="submit" onClick={handleSubmit}>OK</button>
                <button className="bg-slate-900 w-fit px-5 py-1 rounded-xl my-2" type="button"onClick={handleSkip}>Skip</button>
            </form>
        </>
    )
    
}