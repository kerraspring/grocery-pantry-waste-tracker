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
        <div className="bg-slate-400/25 rounded-2xl">
            <form onSubmit={handleDefaultSubmit} className="flex justify-evenly gap-3 flex-col p-5 pt-6">
                <div className="flex gap-2 pl-2">
                    <label className="w-10">Qty:</label>
                    <input
                        className="text-black bg-sky-200 h-fit"
                        type="number"
                        min="0"
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 pl-2">
                    <label className="w-10">Cost:</label>
                    <input
                        className="text-black bg-sky-200 h-fit"
                        type="number"
                        step=".01"
                        min="0"
                        value={cost}
                        onChange={e => setCost(e.target.value)}
                    />
                </div>
                <div className="justify-center gap-3 flex">
                    <button className="bg-slate-900 w-fit px-4 py-1 rounded-xl mt-2" type="submit" onClick={handleSubmit}>OK</button>
                    <button className="bg-slate-900 w-fit px-5 py-1 rounded-xl mt-2" type="button"onClick={handleSkip}>Skip</button>
                </div>
            </form>
        </div>
    )
    
}