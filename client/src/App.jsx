import { useEffect, useState } from "react"
import { GroceryList } from "./GroceryList"
import { PantryList } from "./PantryList"
import { CostCalc } from "./CostCalc"

export default function App({onLogout, handleLogoutClick, backendUri}) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

	useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchLists();
        setData(res.items);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  
async function fetchLists() {
  try {
      const res = await fetch(`${backendUri}/lists`, {
          method: "GET",
          credentials: "include",
          headers: {
              Accept: "application/json",
          },
      });

      if (res.status === 200) {
          return res.json();
      } else {
          throw new Error("Failed to fetch lists");
      }
  } catch (err) {
      console.error(err);
      throw err; 
  }
}

async function addToLists(item) {
  try {
    await fetch(`${backendUri}/lists`, {
      method: "POST",
      credentials: "include",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        item: {
          id: item.id,
          title: item.title,
          listType: item.listType,
          quantity: item.qty,
          cost: item.cost
        }
    })
  });

  
  } catch (err) {
      console.error(err);
      throw err; 
  }
}

async function updateItem(items) {
  try {

    const itemList = Array.isArray(items) ? items : [items];

    await fetch(`${backendUri}/lists`, {
      method: "PUT",
      credentials: "include",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: itemList.map(item => ({
            id: item.id,
            title: item.title,
            listType: item.listType,
            quantity: item.qty,
            cost: item.cost,
        })),
    }),
});
  
  
  } catch (err) {
      console.error(err);
      throw err; 
  }
}

async function deleteItem(itemId) {
  try {
    await fetch(`${backendUri}/lists`, {
      method: "DELETE",
      credentials: "include",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({itemId})
  });

  
  } catch (err) {
      console.error(err);
      throw err; 
  }
}



  const [newGrocItem, setNewGrocItem] = useState("")
  const [grocList, setGrocList] = useState([])

  const [newPantryItem, setNewPantryItem] = useState("")
  const [pantryList, setPantryList] = useState([])

  const [costTotal, setCostTotal] = useState(0)

  const [wasteTotal, setWasteTotal] = useState(0)

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      data.forEach(item => {
        if (item.listType === 'grocery' && !grocList.some(existingItem => existingItem.id === item.id)) {
          setGrocList(prevList => [...prevList, item]);
        } else if (item.listType === 'pantry' && !pantryList.some(existingItem => existingItem.id === item.id)) {
          setPantryList(prevList => [...prevList, item]);
        }
      });
    }
  }, [data, grocList, pantryList, loading]);
  

  useEffect(() => {
    // console.log("costTotal:", costTotal);
  }, [costTotal]);

  useEffect(() => {
    // console.log("wasteTotal:", wasteTotal);
  }, [wasteTotal]);

  useEffect(() => {
    // console.log("grocList:", grocList);
  }, [grocList]);
  
  useEffect(() => {
    // console.log("pantryList;",pantryList);
  }, [pantryList]);


    function handleGrocSubmit(e) {
        e.preventDefault()

        const newItem = {id: crypto.randomUUID(), title: newGrocItem, checked: false, qty: 0, cost: 0, listType:'grocery'};

        setGrocList(currentGrocList => [...currentGrocList, newItem])
        setNewGrocItem("")

        if (newGrocItem) {
          try {
              addToLists({ id: newItem.id, title: newGrocItem, qty: 0, cost: 0, listType: 'grocery' });
          } catch (error) {
              console.error("Error adding to lists:", error);
          }
      }
    }

    function handlePantrySubmit(e) {
        e.preventDefault()

        const newItem = {id: crypto.randomUUID(), title: newPantryItem, checked: false, qty: 0, cost: 0, listType:'pantry'};

        setPantryList(currentPantryList => [...currentPantryList, newItem])
        setNewPantryItem("")

        if (newPantryItem) {
          try {
              addToLists({ id: newItem.id, title: newPantryItem, qty: 0, cost: 0, listType: 'pantry' });
          } catch (error) {
              console.error("Error adding to lists:", error);
          }
      }
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
      
      const checkedList = grocList.filter((grocItem) => grocItem.checked).map((grocItem) => ({...grocItem, checked: false, listType:'pantry'}))

      updateItem(checkedList)

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
      

    function handleMoveToGrocList(pantryItemToMove) {

      const itemsToMove = pantryList.filter((pantryItem) => pantryItem.id === pantryItemToMove.id).map((pantryItemToMove) => ({...pantryItemToMove, listType: 'grocery'}))

      updateItem(itemsToMove)

      if (itemsToMove.length > 0) {
        setGrocList((currentGrocList) => [...currentGrocList, ...itemsToMove])
      }

      const updatedPantryList = pantryList.filter(pantryItem => pantryItem.id !== pantryItemToMove.id)
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
      deleteItem(itemId)

    }



  return(
    <div className="bg-main-blue w-screen h-screen text-white text-lg px-10">
      <div className="flex justify-end">
        <button onClick={() => handleLogoutClick(onLogout)} className="button bg-dark-blue py-2 px-4 mt-2 rounded-xl">Logout</button>
      </div>

      <div className="flex justify-center py-5">
        <CostCalc costTotal={costTotal} wasteTotal={wasteTotal}/>
      </div>

      <div className="flex justify-evenly gap-10">
        <GroceryList
          handleGrocSubmit={handleGrocSubmit}
          grocList={grocList}
          newGrocItem={newGrocItem}
          setNewGrocItem={setNewGrocItem}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
          handleAddQtyAndCost={handleAddQtyAndCost}
          handleConfirmPurchase={handleConfirmPurchase}
          data={data}
        />

        

        <PantryList
          handlePantrySubmit={handlePantrySubmit}
          pantryList={pantryList}
          newPantryItem={newPantryItem}
          setNewPantryItem={setNewPantryItem} handleMoveToGrocList={handleMoveToGrocList} handleDelete={handleDelete}
          wasteTotal={wasteTotal}
          setWasteTotal={setWasteTotal}
          setPantryList={setPantryList}
          data={data}
        />

        
      </div>
    </div>
  )
}