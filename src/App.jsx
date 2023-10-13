import { useState } from "react"
import { GroceryList } from "./GroceryList"
import { PantryList } from "./PantryList"

export default function App() {
  const [newGrocItem, setNewGrocItem] = useState("")
  const [grocList, setGrocList] = useState([])

  const [newPantryItem, setNewPantryItem] = useState("")
  const [pantryList, setPantryList] = useState([])


    function handleGrocSubmit(e) {
        e.preventDefault()

        setGrocList(currentGrocList => {
        return[
            ...currentGrocList, {id: crypto.randomUUID(), title: newGrocItem, checked: false},
        ]
        })

        setNewGrocItem("")
    }

    function handlePantrySubmit(e) {
        e.preventDefault()

        setPantryList(currentPantryList => {
        return[
            ...currentPantryList, {id: crypto.randomUUID(), title: newPantryItem},
        ]
        })

        setNewPantryItem("")
    }

    function handleChecked (grocItemId) {
      setGrocList((prevGrocList) =>
        prevGrocList.map((grocItem) => {
          if (grocItem.id === grocItemId){
            const updatedItem = { ...grocItem, checked: !grocItem.checked }
            return updatedItem
          } 
          return grocItem
        })
      )
    }

    function handleConfirmPurchase(grocList) {
      grocList.map((grocItem) => {
        if (grocItem.checked) {
          setPantryList(currentPantryList => {
            return [
              ...currentPantryList, grocItem
            ]
          })
        }
      })
    } console.log(pantryList)


  return(
    <>
      <GroceryList handleGrocSubmit={handleGrocSubmit} grocList={grocList} newGrocItem={newGrocItem} setNewGrocItem={setNewGrocItem} handleChecked={handleChecked}/>

      <label>Done Shopping?</label>
      <button onClick={e => handleConfirmPurchase(grocList)}>Confirm</button>

      <PantryList handlePantrySubmit={handlePantrySubmit} pantryList={pantryList} newPantryItem={newPantryItem} setNewPantryItem={setNewPantryItem} />
      
      
    </>
  )
}

//add inbetween itemschecked list/state in App, when state updated in Grocery to checked, then push item to itemscheckedlist which are then passed down to Pantry via props and pushed to pantryitemslist