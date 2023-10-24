import { useEffect, useState } from "react";
import { CheckOffPopup } from "./CheckOffPopup";

export function GroceryList({ setNewGrocItem, newGrocItem, handleGrocSubmit, grocList, handleChecked, handleDelete,handleAddQtyAndCost }) {

    useEffect(() => {
      }, [grocList]);
    
    const [selectedGrocItem, setSelectedGrocItem] = useState(null)

    return (
        <>

        <h1>Grocery List</h1>

        <form onSubmit={handleGrocSubmit}>
        <label>Add New Item</label>
        <input
            value={newGrocItem}
            onChange={e => setNewGrocItem(e.target.value)}
            type="text" />
        <button>Add Item</button>
        </form>

        <ul>
        {grocList.map(grocItem => {
            return <li key={grocItem.id}>
            <label>
                <input
                    type="checkbox"
                    onClick={e => {handleChecked(grocItem.id); setSelectedGrocItem(grocItem.id)}}
                />{grocItem.title}
            </label>
            <button
                onClick={() =>handleDelete(grocItem.id, "groc")}
            >Delete</button>

            {selectedGrocItem === grocItem.id && (<CheckOffPopup
                grocItemId={grocItem.id}
                checked={grocItem.checked} handleAddQtyAndCost={handleAddQtyAndCost} selectedGrocItem={selectedGrocItem} setSelectedGrocItem={setSelectedGrocItem}
            />)}
        </li>
        })}
        
        </ul>
    
        </>
    )
}