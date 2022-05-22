import {React, useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getAllItems, addItemApi, editItemApi, softDeleteItemApi } from "./Api";
import Nav from "./Nav";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(null);

  /** Get all items on initial load */
  useEffect(function() {
    async function getItems() {
        const data = await getAllItems();
        setItems(data.items);
        setIsLoading(false);
    }

    getItems();
  }, []);

  async function addItem(formData) {
    let item = await addItemApi(formData);
    console.log("Adding item from form", item);
    setItems(i => ([
      ...i, item
    ]));
  }

  async function editItem(formData) {
    let updatedItem = await editItemApi(formData);
    console.log("Editing item from form", updatedItem);
    setItems(item => item.map((i) =>
      i.id === updatedItem.id
        ? { ...updatedItem }
        : i
    ));
  }

  async function deleteItem(msg) {
    let deletedItem = await softDeleteItemApi(msg);
    console.log("Deleting item");
    setItems(item => item.map((i) =>
      i.id === deletedItem.id
        ? { ...deletedItem }
        : i
    ));
  }


  if(isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <main>
        <Switch>
          <Route exact path="/">
            <ItemList 
              items={items} 
              editItem={editItem} 
              deleteItem={deleteItem}
            />
          </Route>
          <Route exact path="/addItem">
            <ItemForm addItem={addItem}/>
          </Route>
        </Switch>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
