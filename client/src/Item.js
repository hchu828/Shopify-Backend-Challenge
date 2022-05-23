import React from "react";

function Item({id, name, price, deleted, msg }) {
  return (
    <div className="Todo">
        <b>{deleted && "(DELETED)"}{name}</b>
        {deleted && 
        <div>
          <small>Message:{msg}</small>
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