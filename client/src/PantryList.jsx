import { TrackWastePopup } from "./TrackWastePopup";
import { useEffect, useState } from "react";
import { FiTrash2, FiCheckSquare } from "react-icons/fi";


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
        <div className="w-fit h-fit border border-white px-3 py-1.5">

        <h1 className="text-3xl">Pantry List</h1>

        <form className="my-1.5 flex flex-col items-start" onSubmit={handlePantrySubmit}>
        <label>Add New Item</label>
        <div className="flex flex-row justify-evenly items-center gap-3">
        <input
            className="text-black bg-light-blue"
            value={newPantryItem}
            onChange={e => setNewPantryItem(e.target.value)}
            type="text" />
        <button className="bg-dark-blue w-fit px-5 py-1 rounded-xl my-2">Add Item</button>
        </div>
        </form>

        <ul className="my-2">
        {pantryList.map(pantryItem => {
            return <li key={pantryItem.id} className="flex flex-col gap-2">
            <label className="flex items-center gap-2">{pantryItem.title}
                <button
                    className="text-sm"
                    onClick={e => handleWasteTracking(pantryItem.id, "addToList")}
                >
                <FiCheckSquare/></button>
                <button className="text-sm"
                    onClick={e => handleWasteTracking(pantryItem.id, "delete")}
                >
                <FiTrash2/></button>
            </label>

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