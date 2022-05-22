import {React, useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getAllItems } from "./Api";
import Nav from "./Nav";
import ItemList from "./ItemList";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(function() {
    async function getItems() {
        const items = await getAllItems();
        setItems(items);
        setIsLoading(false);
        console.log(items);
    }

    getItems();
  }, []);


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
            <ItemList items={items} />
          </Route>
        </Switch>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
