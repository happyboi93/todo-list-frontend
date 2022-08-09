import './App.css';
import axios from 'axios';
import {useState} from 'react';
// import Header from './components/Header';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
//var [ name , setName ] = useState()
function App() {
  const [initialState, setInitialState] = useState([])

  useEffect(()=>{
    fetch('/api/item').then(res =>{
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => console.log(jsonResponse))
  },[])

  console.log(initialState);
  var [itemText, setItemText] = useState()
  // add items to todo-list function
  const addItem = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/item', {item:itemText})
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  
  // onChange event
  const itemChange = (e)=>{setItemText(e.target.value)}
  return(
    <div className='App'>
     <h1> Todo List</h1>
    <form className="form">
      <input type="text" placeholder="add todo item" onChange={itemChange} />

      <button type="submit" onSubmit={e =>addItem(e)}>Add</button>
    </form>
    <div className="todo-listItems">
      <div className="todo-list">
        <p className="item-content">This is a todo item</p>
        <button className="item-update" type="submit">update</button>
        <button className="item-delete" type="submit">delete</button>
      </div>
    </div>
    <div className="todo-listItems">
      <div className="todo-list">
        <p className="item-content">This is a todo item</p>
        <button className="item-update" type="submit">update</button>
        <button className="item-delete" type="submit">delete</button>
      </div>
    </div>
    <div className="todo-listItems">
      <div className="todo-list">
        <p className="item-content">This is a todo item</p>
        <button className="item-update" type="submit">update</button>
        <button className="item-delete" type="submit">delete</button>
      </div>
    </div>
    </div>
  );
}

export default App;

    // value={itemText}
