import { useEffect, useState } from "react"
import { GroceryList } from "./GroceryList"
import { PantryList } from "./PantryList"
import { CostCalc } from "./CostCalc"

export default function App({onLogout, handleLogoutClick}) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [newGrocItem, setNewGrocItem] = useState("")
  const [grocList, setGrocList] = useState([])

  const [newPantryItem, setNewPantryItem] = useState("")
  const [pantryList, setPantryList] = useState([])

  const [costTotal, setCostTotal] = useState(0)

  const [wasteTotal, setWasteTotal] = useState(0)

	useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      data.forEach(item => {
        if (item.listType === 'grocery' && !grocList.some(existingItem => existingItem.id === item.id)) {
          setGrocList(prevList => [...prevList, item]);
        } else if (item.listType === 'pantry' && !pantryList.some(existingItem => existingItem.id === item.id)) {
          setPantryList(prevList => [...prevList, item]);
        }
      });
    } console.log(grocList, pantryList)
  }, [data, loading]);
  

  useEffect(() => {
    // console.log("costTotal:", costTotal);
  }, [costTotal]);

  useEffect(() => {
    // console.log("wasteTotal:", wasteTotal);
  }, [wasteTotal]);

async function fetchData() {
  try {
    const res = await fetchLists();
    setData(res.items);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
}
  
async function fetchLists() {
  try {
      const res = await fetch("/lists", {
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
    await fetch("/lists", {
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

    await fetch("/lists", {
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
            timestamp: item.timestamp
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
    await fetch("/lists", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    await fetchData();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

    function handleGrocSubmit(e) {
        e.preventDefault()

        const timestamp = new Date().toISOString()
        const newItem = {id: crypto.randomUUID(), title: newGrocItem, checked: false, qty: 0, cost: 0, listType:'grocery', timestamp: timestamp};

        setGrocList(currentGrocList => [...currentGrocList, newItem])
        setNewGrocItem("")

        if (newGrocItem) {
          try {
              addToLists({ id: newItem.id, title: newGrocItem, qty: 0, cost: 0, listType: 'grocery', timestamp: timestamp() });
          } catch (error) {
              console.error("Error adding to lists:", error);
          }
      }
    }

    function handlePantrySubmit(e) {
        e.preventDefault()

        const timestamp = new Date().toISOString()
        const newItem = {id: crypto.randomUUID(), title: newPantryItem, checked: false, qty: 0, cost: 0, listType:'pantry', timestamp: timestamp};

        setPantryList(currentPantryList => [...currentPantryList, newItem])
        setNewPantryItem("")

        if (newPantryItem) {
          try {
              addToLists({ id: newItem.id, title: newPantryItem, qty: 0, cost: 0, listType: 'pantry', timestamp: timestamp });
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

    const [listTab, setListTab] = useState('grocery')

  return(
    <div className="bg-main-blue w-screen h-screen text-white text-lg flex flex-col">
      <div className="flex flex-col h-screen md:overflow-auto">
        <div className="flex justify-end h-fit m-2">
          <button onClick={() => handleLogoutClick(onLogout)} className="button bg-dark-blue py-2 px-4 rounded-xl">Logout</button>
        </div>

        <div className="flex justify-center h-fit m-4">
          <CostCalc costTotal={costTotal} wasteTotal={wasteTotal}/>
        </div>

        <div className="flex justify-evenly grow overflow-scroll md:overflow-visible">

        <div className={`md:flex ${listTab === 'grocery' ? 'block' : 'hidden'}`}>
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
        </div>

        <div className={`md:flex ${listTab === 'pantry' ? 'block' : 'hidden'}`}>
    <PantryList
      handlePantrySubmit={handlePantrySubmit}
      pantryList={pantryList}
      newPantryItem={newPantryItem}
      setNewPantryItem={setNewPantryItem}
      handleMoveToGrocList={handleMoveToGrocList}
      handleDelete={handleDelete}
      wasteTotal={wasteTotal}
      setWasteTotal={setWasteTotal}
      setPantryList={setPantryList}
      data={data}
    />
        </div>
        </div>

        <div className=" md:hidden grid grid-flow-col justify-around bg-dark-blue w-screen text-2xl h-16 flex-none bottom-0">
        <button onClick={() => setListTab('grocery')}>Grocery List</button>
        <button onClick={() => setListTab('pantry')}>Pantry List</button>
        </div>
</div>

    </div>
  )
}