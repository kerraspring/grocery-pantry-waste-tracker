import { useEffect, useState } from "react";
import { CheckOffPopup } from "./CheckOffPopup";
import { FiTrash2 } from "react-icons/fi";

export function GroceryList({ setNewGrocItem, newGrocItem, handleGrocSubmit, grocList, handleChecked, handleDelete,handleAddQtyAndCost, handleConfirmPurchase }) {

    useEffect(() => {
      }, [grocList]);
    
    const [selectedGrocItem, setSelectedGrocItem] = useState(null)

    return (
        <div className="w-auto h-fit border border-white px-3 py-1.5">

        <h1 className="text-3xl">Grocery List</h1>

        <form className="my-1.5 flex flex-col items-start" onSubmit={handleGrocSubmit}>
            <label>Add New Item</label>
            <div className="flex flex-row justify-evenly items-center gap-3">
                <input
                    className="text-black bg-sky-200 h-fit"
                    value={newGrocItem}
                    onChange={e => setNewGrocItem(e.target.value)}
                    type="text" />
                <button className="bg-slate-900 w-fit px-5 py-1 rounded-xl my-2">Add Item</button>
            </div>
        </form>

        <ul className="my-2">
        {grocList.map(grocItem => {
            return <li key={grocItem.id} className="flex gap-2">
            <label className="flex gap-1.5">
                <input
                    type="checkbox"
                    onClick={e => {handleChecked(grocItem.id); setSelectedGrocItem(grocItem.id)}}
                />{grocItem.title}
            </label>
            <button
                className="text-sm"
                onClick={() =>handleDelete(grocItem.id, "groc")}
            ><FiTrash2/></button>

    {/* icons & accessability - aria label? alt text? */}

            {selectedGrocItem === grocItem.id && (<CheckOffPopup
                grocItemId={grocItem.id}
                checked={grocItem.checked} handleAddQtyAndCost={handleAddQtyAndCost} selectedGrocItem={selectedGrocItem} setSelectedGrocItem={setSelectedGrocItem}
            />)}
        </li>
        })}
        
        </ul>

        {/* <label>Done Shopping?</label> */}
      <button className="bg-slate-900 w-fit px-5 py-1 rounded-xl my-2 flex items-center mx-auto" onClick={e => handleConfirmPurchase(grocList)}>Done Shopping</button>
    
        </div>
    )
}