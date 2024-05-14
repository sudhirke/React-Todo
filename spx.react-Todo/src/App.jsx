import { useState } from 'react'
import './style.css'
import SimpleCharts from './componenets/charts'


//APP Component
export default function App(){
  const [todos,setTodos] =  useState([])
  const [newItem,setNewItem] =  useState("")

  //Function called when form submitted
function handleSubmit(e) {
  e.preventDefault()
  setTodos(
      currentTodos => {
        return(
          [...todos,
          {id:crypto.randomUUID(),title: newItem,completed:false}
        ])
    }
  )

  setNewItem("")
}

//function to update task to completed
function toggleTodo(id,completed) 
{
      setTodos(currentTodos => {
        return(currentTodos.map(todo => {
          if(todo.id === id){

            return{...todo,completed}
          }
          return todo

        })
      )
      })
}

function deleteTodo(id){

  setTodos(currentTodos => {
    return currentTodos.filter(todo => todo.id !==id) 
  })
}

//build the react component
return <>
  <form className="new-item-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <label htmlFor="taskItem">New Item</label>
      <input 
        type="text" 
        id="taskItem" 
        value={newItem} 
        onChange={e => setNewItem(e.target.value)} ></input>
    </div>
    <button className="btn">Add Task</button>
    </form>
  <h1 className="header">Next Actions</h1>
  <ul className="list">
    {todos.length ===0 && "Yay! no pending tasks."}
    {todos.map(task => {
        return(
          <li key={task.id}>
            <label>
              <input type="checkbox" value={task.completed} 
              onChange={e => toggleTodo(task.id,e.target.checked)}/>
              {task.title}
              <button className='btn btn-danger' onClick={() => deleteTodo(task.id)}>Delete</button>
            </label>
          </li>
          )
    })}
  </ul>
  <SimpleCharts></SimpleCharts>
</>
}