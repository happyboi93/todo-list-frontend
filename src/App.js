import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
// import {useEffect, useState} from 'react';

const App = () => {
  // const [initialState, setInitialState] = useState([])
  const [itemText, setItemText] = useState('')
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('')

// fetch all todo-item
  useEffect(()=>{
    const getItemList = async()=>{
      try {
        const res = await axios.get('/api/item')
        setListItems(res.data);
        console.log('render');
      } catch (error) {
        console.log(error);
      }
    }
    getItemList()
  },[]);

  // add new todo item to database
  const addItem = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('/api/item', {item:itemText})
      setListItems(prev => [...prev,res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  }
  // update item to database
  // before update
  const renderUpdateForm =()=>(
    <form className='update-form'>
      <input type='text' placeholder='New Item'/>
      <button className='update-new-btn' 
              type='submit'>Update</button>
    </form>
  )
    // delete item to database
    const deleteItem = async (id)=>{
      try {
        const res = await axios.delete(`/api/item/${id}`)
        const newListItems = listItems.filter(item=> item._id !== id);
        setListItems(newListItems);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='App'>
     <h1> Todo List</h1>
    <form className="form" onSubmit={e =>addItem(e)}>
      <input type="text" 
        placeholder="add todo item" 
        onChange={e => {setItemText(e.target.value)}} 
        value={itemText} />
      <button type="submit" >Add</button>
    </form>
    <div className="todo-listItems">
      {
        listItems.map(item => (
        <div className="todo-list">
          {
            isUpdating === item._id 
            ? renderUpdateForm()
            : <>
              <p className="item-content">{item.item}</p>
              <button className="item-update" type="submit" onClick={()=>{setIsUpdating(item._id)}}>update</button>
              <button className="item-delete" type="submit" onClick={()=>{deleteItem(item._id)}}> delete</button>
            </>
          }
        </div>
        ))
      }
    </div>
    </div>
  )
}


export default App;
