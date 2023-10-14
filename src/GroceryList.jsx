import { useEffect } from "react";

export function GroceryList({ setNewGrocItem, newGrocItem, handleGrocSubmit, grocList, handleChecked, handleDelete }) {

    useEffect(() => {
      }, [grocList]);
    
    

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
            <label><input type="checkbox" onClick={e => handleChecked(grocItem.id)}/>{grocItem.title}</label>
            <button onClick={() =>handleDelete(grocItem.id, "groc")}>Delete</button>
        </li>
        })}
        
        </ul>
    
        </>
    )
}