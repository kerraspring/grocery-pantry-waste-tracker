import { TrackWastePopup } from "./TrackWastePopup";
import { useEffect, useState } from "react";

export function PantryList({ handlePantrySubmit, setNewPantryItem, pantryList, newPantryItem, handleMoveToGrocList, handleDelete, wasteTotal, setWasteTotal }) {
    
    useEffect(() => {
    }, [pantryList]);

    const [openTrackWaste, setOpenTrackWaste] = useState(false)

    const [selectedPantryItem, setSelectedPantryItem] = useState(null)

    const [buttonSource, setButtonSource] = useState(null)

    useEffect(() => {
        console.log(buttonSource);
    }, [buttonSource]);

    function handleWasteTracking (pantryItemId, source) {
        setSelectedPantryItem(pantryItemId)
        setOpenTrackWaste(true)

        if (source === "addToList") {
            setButtonSource("addToList")
        } else if (source === "delete") {
            setButtonSource("delete")
        }
    }

    return (
        <div className="w-fit">

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
                onClick={e => handleWasteTracking(pantryItem.id, "addToList")}
            >
            Add to List</button>
            <button
                onClick={e => handleWasteTracking(pantryItem.id, "delete")}
            >
            Delete</button>

            {selectedPantryItem === pantryItem.id && (<TrackWastePopup
                open={openTrackWaste}
                handleDelete={handleDelete}
                pantryItem={pantryItem}
                wasteTotal={wasteTotal}
                setWasteTotal={setWasteTotal}
                setSelectedPantryItem={setSelectedPantryItem}
                handleMoveToGrocList={handleMoveToGrocList}
                buttonSource={buttonSource}
            />)}

        </li>
        })}
        
        </ul>
    
        </div>
    )
}