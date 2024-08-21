import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'
import Create from './Create';
function Home() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, [])

    const handleEdit = (id) => {
        axios.put("http://localhost:3001/update/" + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete("http://localhost:3001/delete/" + id)
            .then(result => {
                location.reload();
            })
            .catch(err => (console.log(err)));

    }
    return (
        <div className="home">
            <h2>To-Do List</h2>
            <Create />
            {todos.length === 0
                ?
                <div className="empty-task">
                    <h4>No Tasks</h4></div>
                :
                todos.map(todo => (
                    <div className="task">
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done==true
                                ?
                                <BsFillCheckCircleFill className="icon" />
                                :
                                <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}

export default Home;