import { TrackWastePopup } from "./TrackWastePopup";
import { useEffect, useState } from "react";

export function PantryList({ handlePantrySubmit, setNewPantryItem, pantryList, newPantryItem, handleMoveToGrocList, handleDelete, wasteTotal, setWasteTotal }) {
    
    useEffect(() => {
    }, [pantryList]);
  
    const [openTrackWaste, setOpenTrackWaste] = useState(false)

    const [selectedPantryItem, setSelectedPantryItem] = useState(null)

    function handleWasteTracking (pantryItemId) {
        setSelectedPantryItem(pantryItemId)
        setOpenTrackWaste(true)
    }


    return (
        <>

        <h1>Pantry List</h1>

        <form onSubmit={handlePantrySubmit}>
        <label>Add New Item</label>
        <input
            value={newPantryItem}
            onChange={e => setNewPantryItem(e.target.value)}
            type="text" />
        <button>Add Item</button>
        </form>

        <ul>
        {pantryList.map(pantryItem => {
            return <li key={pantryItem.id}>
            <label>{pantryItem.title}</label>
            <button
                onClick={() => handleMoveToGrocList(pantryItem.id)}
            >
            Add to List</button>
            <button
                onClick={e => handleWasteTracking(pantryItem.id)}
            >
            Delete</button>

            {selectedPantryItem === pantryItem.id && (<TrackWastePopup
                open={openTrackWaste}
                handleDelete={handleDelete}
                pantryItem={pantryItem}
                wasteTotal={wasteTotal}
                setWasteTotal={setWasteTotal}
                setSelectedPantryItem={setSelectedPantryItem}
            />)}

        </li>
        })}
        
        </ul>
    
        </>
    )
}