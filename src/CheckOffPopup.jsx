import { useState } from "react"

export function CheckOffPopup({grocItemId, handleAddQtyAndCost, setSelectedGrocItem }) {



    

    const [qty, setQty] = useState("")
    const [cost, setCost] = useState ("")

    const handleSubmit= (e) => {
        e.preventDefault()
        handleAddQtyAndCost(grocItemId, qty, cost)
        setSelectedGrocItem(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button>OK</button>
                <button>Skip</button>
            </form>
        </>
    )
    
}