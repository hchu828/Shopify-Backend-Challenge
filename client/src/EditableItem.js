import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Item from "./Item";
import DeleteItemForm from "./DeleteItemForm";

function EditableItem({item, editItem, deleteItem, undeleteItem, hardDeleteItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /** Toggle if this is being edited */
  function toggleEdit(evt) { 
    setIsEditing(e => !e); 
  };

  /** Toggle if this is being deleted*/
  function toggleDelete(evt) { 
    setIsDeleting(e => !e); 
  };

  /** Edit form saved; toggle isEditing and update in ancestor. */
  function handleEditSave(formData) {
    toggleEdit();
    editItem(formData);
  };

  function handleDeleteSave(formData) {
    toggleDelete();
    deleteItem(formData);
  }

  function handleUndeleteSave() {
    undeleteItem({id: item.id})
  }

  function handleHardDelete() {
    hardDeleteItem({id: item.id });
  }

  return (
    <div>
      {isEditing && !isDeleting &&
        <ItemForm 
          initialFormData={item}
          handleSave={handleEditSave}
        />
      }
      {!isEditing &&
        <div>
          <Item 
            id={item.id} 
            name={item.name} 
            price={item.price}
            deleted={item.deleted}
            msg={item.msg}
          />
        {item.deleted
        ? <>
          <button onClick={handleUndeleteSave}>
            Undelete Item
          </button>
          <button onClick={handleHardDelete}>
            Permanently Delete Item
          </button>
          </>
        :
          <>
          <button onClick={toggleEdit}>
            Edit Item
          </button>
          <button onClick={toggleDelete}>
            Delete Item
          </button>
          </>
        }
        </div>
      }
      {isDeleting && 
        <DeleteItemForm
          id={item.id} 
          handleSave={handleDeleteSave}
        />
      }
    </div>
  );

}

export default EditableItem;