
export function PantryList({ handlePantrySubmit, setNewPantryItem, pantryList, newPantryItem, handleMoveToGrocList, handleDelete }) {
    
    

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
            <button onClick={() => handleMoveToGrocList(pantryItem.id)}>Add to List</button>
            <button onClick={() => handleDelete(pantryItem.id, "pantry")}>Delete</button>
        </li>
        })}
        
        </ul>
    
        </>
    )
}