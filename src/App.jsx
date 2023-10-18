import { useEffect, useState } from "react"
import { GroceryList } from "./GroceryList"
import { PantryList } from "./PantryList"
import { CostCalc } from "./CostCalc"

export default function App() {
  const [newGrocItem, setNewGrocItem] = useState("")
  const [grocList, setGrocList] = useState([])

  const [newPantryItem, setNewPantryItem] = useState("")
  const [pantryList, setPantryList] = useState([])

  const [costTotal, setCostTotal] = useState(0)

  useEffect(() => {
    console.log("costTotal:", costTotal);
  }, [costTotal]);

  useEffect(() => {
    console.log("grocList:", grocList);
  }, [grocList]);
  
  useEffect(() => {
    console.log("pantryList;",pantryList);
  }, [pantryList]);


    function handleGrocSubmit(e) {
        e.preventDefault()

        setGrocList(currentGrocList => {
        return[
            ...currentGrocList, {id: crypto.randomUUID(), title: newGrocItem, checked: false, qty: 0, cost: 0},
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
      setGrocList((currentGrocList) =>
        currentGrocList.map((grocItem) => {
          if (grocItem.id === grocItemId){
            const updatedItem = { ...grocItem, checked: !grocItem.checked }
            return updatedItem
          } 
          return grocItem
          
        })
      )
    }

    function handleAddQtyAndCost (grocItemId, qty, cost) {
      
      setGrocList((currentGrocList) =>
        currentGrocList.map((grocItem) => {
          if (grocItem.id === grocItemId){
            const updatedItem = { ...grocItem, qty, cost }
            return updatedItem
          } 
          return grocItem
          
        })
      )
    }


    function handleConfirmPurchase(grocList) {
      
      const checkedList = grocList.filter((grocItem) => grocItem.checked).map((grocItem) => ({...grocItem, checked: false}))

      setPantryList((currentPantryList) => [...currentPantryList, ...checkedList])
          
      const updatedGrocList = grocList.filter(grocItem => !grocItem.checked)
      setGrocList(updatedGrocList)

      const itemCosts = grocList.filter((grocItem) => grocItem.checked).map((grocItem) => {
        const qty = parseInt(grocItem.qty, 10)
        const cost = parseFloat(grocItem.cost)
        return qty * cost
      })

      setCostTotal((currentCostTotal) => {
        const numCurrentCostTotal = parseFloat(currentCostTotal)
        return numCurrentCostTotal + itemCosts.reduce((prevCost, cost) => prevCost + cost, 0)
      })
    }
      
    

    function handleMoveToGrocList(pantryItemId) {
       
      const itemsToMove = pantryList.filter((pantryItem) => pantryItem.id === pantryItemId)

      if (itemsToMove.length > 0) {
        setGrocList((currentGrocList) => [...currentGrocList, ...itemsToMove])
      }

      const updatedPantryList = pantryList.filter(pantryItem => pantryItem.id !== pantryItemId)
      setPantryList(updatedPantryList)

    }


    function handleDelete (itemId, itemType) {
      if (itemType === "groc") {
        const updatedGrocList = grocList.filter((grocItem) => grocItem.id !== itemId)
        setGrocList(updatedGrocList)
      } else if (itemType === "pantry") {
        const updatedPantryList = pantryList.filter((pantryItem) => pantryItem.id !== itemId)
        setPantryList(updatedPantryList)
      }

    }


  return(
    <>
      <GroceryList handleGrocSubmit={handleGrocSubmit} grocList={grocList} newGrocItem={newGrocItem} setNewGrocItem={setNewGrocItem} handleChecked={handleChecked} handleDelete={handleDelete} handleAddQtyAndCost={handleAddQtyAndCost}/>

      <label>Done Shopping?</label>
      <button onClick={e => handleConfirmPurchase(grocList)}>Confirm</button>

      <PantryList handlePantrySubmit={handlePantrySubmit} pantryList={pantryList} newPantryItem={newPantryItem} setNewPantryItem={setNewPantryItem} handleMoveToGrocList={handleMoveToGrocList} handleDelete={handleDelete}/>

      <CostCalc costTotal={costTotal}/>
      
    </>
  )
}