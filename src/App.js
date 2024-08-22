import React, { useReducer, useState } from 'react';
import './App.css';

const initialState = {
  items: []
};


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updatedItems };
    }
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items: filteredItems };
    }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemId, setItemId] = useState(0);

  const handleAddItem = () => {
    if (itemName && itemQuantity > 0) {
      dispatch({
        type: 'ADD_ITEM',
        payload: { id: itemId, name: itemName, quantity: itemQuantity }
      });
      setItemId(prevId => prevId + 1); 
      setItemName('');
      setItemQuantity(1);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };

  const handleRemoveItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id }
    });
  };

  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <div>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name"/><br></br>
        <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(Math.max(1, Number(e.target.value)))} min="1" placeholder="Quantity"/><br></br>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
