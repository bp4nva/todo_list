import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    const handleAddTodo = () => {
        console.log("handleAddToDo: headingInput: " + headingInput)
        if (headingInput.trim() !== '') {
          // todos is an array of heading/list {heading: <heading>, lists: []},
          // items, where heading is the main todo category - "Groceries",
          // for example, and the list is the specific grocery items to get
          setTodos([...todos, { heading: headingInput, lists: [] }]);
          setHeadingInput('');
        }
      };

      const handleAddList = (index) => {
            console.log("handleAddList: index: " + index)
            if (listInputs[index] && listInputs[index].trim() !== '') {
                console.log("listInputs[index].trim(): " + listInputs[index].trim())
                const newTodos = [...todos];
                newTodos[index].lists.push(listInputs[index]);
                console.log("newTodos[index].lists: " + newTodos[index].lists)
                setTodos(newTodos);
                setListInputs({ ...listInputs, [index]: '' });
            }
        };
    
        const handleListInputChange = (index, value) => {
            setListInputs({ ...listInputs, [index]: value });
        };      

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
        <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}} // Add onChange event handler to update headingInput state
        />
        <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
            <div key={index} className="todo-card">
                <div className="heading_todo">
                    <h3>{todo.heading}</h3> {/* Display the heading here */}
                    <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading </button>
                </div>
                <ul>
                    {todo.lists.map((list, listIndex) => (
                    <li key={listIndex} className='todo_inside_list'>
                        <p>{list}</p>
                    </li>
                    ))}
                </ul>                
                <div className='add_list'>
                <input
                    type="text"
                    className="list-input"
                    placeholder="Add List"
                    value={listInputs[index] || ''}
                    onChange={(e) => handleListInputChange(index, e.target.value)}/>
                <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
        </div>
            </div>
          ))}        
      </div>
    </>
  );
};

export default TodoList;
