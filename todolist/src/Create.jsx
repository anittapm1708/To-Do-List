import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (task.trim() === "") { // Check if the task is empty or contains only spaces
            alert("Task cannot be empty");
        } else {
            axios.post('http://localhost:3001/add', { task: task })
                .then(result => {
                    setTask("");
                    location.reload();
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="createForm">
            <input
                type="text"
                placeholder="Enter the task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
