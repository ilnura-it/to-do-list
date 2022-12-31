
import { useState} from "react";
import { AiFillDelete } from 'react-icons/ai';

function List (){

const [input, setInput] = useState('');
const [todoList, setTodoList] = useState([]);
//const [image, setImage] = useState(<AiFillDelete/>)

const onChangeEvent = (event) => {
   setInput(event.target.value);
}

const addItem = () => {
 if (input === ''){
    alert ("please enter something")
 } 
 else {
   let listArray = todoList;
   listArray.push(input);
   setTodoList(listArray);
   setInput('');
 }
}

const crossWord = (event) => {
   let todoItem = event.target;
   todoItem.classList.toggle('crossed');
}

const deleteItem = (e) => {
  let listArray = [...todoList];
  listArray.splice(e.index, 1);
  setTodoList(listArray);
}

const onFormSubmit = (e) => {
   e.preventDefault(e);
 }

 function deleteAll (){
   let listArray = todoList;
   listArray = [];
   setTodoList(listArray);
 }

   return (
      <div className="App-list">
         <form onSubmit = {onFormSubmit}>
         <div className="todoContainer">
         
         <input className="inputArea" placeholder="Your Plans..." type="text" onChange ={onChangeEvent} value = {input} />
         <button className="add btn" onClick = {() => addItem()}>ADD</button>
         </div>

         <div className="todoContainer">
            <ol>
              {todoList.map((item, index) => <div className="list" key = {index} onClick={crossWord} > <li>{item} </li><span className="done" > <AiFillDelete onClick = {(e) => deleteItem({index})} /></span> </div>)} 
            </ol>
         </div>
         <div className="todoContainer">
            {todoList.length > 0 &&
         <button className="delete btn" onClick = {() => deleteAll()}>DELETE ALL</button>}
         </div>
         </form>

      </div>
   )
}

export default List;
