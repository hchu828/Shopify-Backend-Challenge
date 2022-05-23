import {React, useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { 
  getItemsApi, 
  addItemApi, 
  editItemApi, 
  softDeleteItemApi,
  softUndeleteItemApi,
  hardDeleteItemApi} from "./Api";
import Nav from "./Nav";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(null);

  /** Get all items on initial load */
  useEffect(function() {
    async function getItems() {
        const data = await getItemsApi();
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

  async function deleteItem(formData) {
    let deletedItem = await softDeleteItemApi(formData);
    console.log("Deleting item");
    setItems(item => item.map((i) =>
      i.id === deletedItem.id
        ? { ...deletedItem }
        : i
    ));
  }

  async function undeleteItem(formData) {
    let undeletedItem = await softUndeleteItemApi(formData);
    console.log("Undeleting item");
    setItems(item => item.map((i) =>
      i.id === undeletedItem.id
        ? { ...undeletedItem }
        : i
    ));
  }

  async function hardDeleteItem(id) {
    let deletedMsg = await hardDeleteItemApi(id);
    console.log("Permanently deleting item", deletedMsg);
    setItems((item => item.filter((i) => i.id !== id)));
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
              undeleteItem={undeleteItem}
              hardDeleteItem={hardDeleteItem}
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
