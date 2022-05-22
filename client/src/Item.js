import React from "react";

function Item({id, name, price, deleted, msg }) {
  return (
    <div className="Todo">
        <b>{name}</b>
        {deleted && 
        <div>
          <small>(deleted)</small>
          <small>{msg}</small>
        </div>
        }
        <div>
          <small>ID: {id}</small> 
          <small>(price: {price})</small>
        </div>
    </div>
    );
}

export default Item;