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
            <form onSubmit={handleDefaultSubmit}>
                <label>Qty</label>
                <input
                    type="number"
                    min="0"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                />
                <label>Cost</label>
                <input
                    type="number"
                    step=".01"
                    min="0"
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>OK</button>
                <button type="button"onClick={handleSkip}>Skip</button>
            </form>
        </>
    )
    
}