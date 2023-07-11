'use client'
import React, { useState } from 'react'
import '../../app/globals.css'

function TaskManager() {
    // state management with React useState Hook
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<any>(null)
    const [taskList, setTaskList] = useState<any[]>([])
    const [taskId, setTaskId] = useState<number>(0)
    const [toggleBtn, setToggleBtn] = useState<Boolean>(true)
    const [activeIndex, setActiveIndex] = useState<any>(null)

    //add tasks to the array(tasjList)
    const addTaskHandler = (e: any) => {
        e.preventDefault();

        if (!title && !description) {
            // Check if title and description are empty
            // Handle the case when no input is provided
        } else if (!toggleBtn) {
            // Check if toggle button is false (indicating an edit operation)
            const temp = [...taskList];
            temp[activeIndex].title = title;
            temp[activeIndex].description = description;
            temp[activeIndex].status = status
            setActiveIndex(null);
            setToggleBtn(true);
        } else {
            // Add a new task to the task list
            setTaskList(prev => [
                ...prev,
                {
                    id: taskId,
                    title: title,
                    description: description,
                    status: status
                }
            ]);

        }
        // Reset input values and update task ID
        setTitle("");
        setDescription("");
        setStatus(null)
        setTaskId(prev => prev + 1)
    };

    const onDeleteTaskHandler = (index: number) => {
        // Filter the task list to remove the task with the specified ID
        const newArray = taskList.filter((item) => item.id !== index);
        setTaskList(newArray);
    };

    function updateTaskHandler(index: number) {
        // Retrieve the task item at the specified index
        let editedItem = taskList[index];
        setActiveIndex(index);
        setToggleBtn(false);
        setDescription(editedItem.description);
        setStatus(editedItem.status)
        setTitle(editedItem.title);
    }

    return (
        <div>
            <div className="bg-red-50 p-4 m-4 rounded flex justify-center items-center flex-col gap-4">
                <div className="bg-blue-100 text-center w-1/2 rounded p-2 text-xl font-bold">
                    Task Management
                </div>

                <div className="bg-violet-200 rounded p-4 w-3/4">
                    <div className="text-center text-xl mb-4 underline">Create New Task</div>
                    <div className="flex justify-center items-center gap-8">
                        <div className="flex flex-col gap-3">
                            <input
                                className="p-3 rounded text-xl font-bold outline-purple-800"
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <textarea
                                className="p-3 rounded font-medium outline-purple-800"
                                rows={4}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            <div className='flex'>
                                <div className="flex gap-4">
                                    <label>
                                        <input
                                            type="radio"
                                            className="accent-violet-600"
                                            name="status"
                                            value="todo"
                                            checked={status === 'todo'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        ToDo
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            className="accent-violet-600"
                                            name="status"
                                            value="inprogress"
                                            checked={status === 'inprogress'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        In Progress
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            className="accent-violet-600"
                                            name="status"
                                            value="completed"
                                            checked={status === 'completed'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        Completed
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="bg-emerald-700 px-10 py-2 text-white rounded hover:shadow-md active:shadow-2xl transition ease-in-out duration-300 hover:scale-110 text-2xl" onClick={addTaskHandler}>
                            {
                                toggleBtn ? "+" : "UPDATE"
                            }
                        </button>
                    </div>
                </div>
                <div className="bg-orange-300 rounded p-4 w-10/12">
                    <div className='font-semibold text-center '>Task List</div>
                    <div className='grid grid-cols-2 gap-4 '>

                        {taskList && taskList.map(item => {
                            return (
                                <div className='border-4 rounded p-4 flex justify-between' key={item.id}>
                                    <div>

                                        <div><span className='font-semibold'>Title: </span>{item.title}</div>
                                        <div><span className='font-semibold'>Description: </span>{item.description}</div>
                                        <div><span className='font-semibold'>Status: </span>{item.status}</div>
                                    </div>
                                    <div className='flex flex-col space-y-4'>
                                        <button className='border-1 rounded p-2 bg-yellow-500 text-white hover:shadow-md active:shadow-2xl transition ease-in-out duration-300 hover:scale-110' onClick={() => updateTaskHandler(item.id)}>Edit</button>
                                        <button className='border-1 rounded p-2 bg-red-700 text-white hover:shadow-md active:shadow-2xl transition ease-in-out duration-300 hover:scale-110' onClick={() => {
                                            console.log(item.id)
                                            onDeleteTaskHandler(item.id)
                                        }
                                        }>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskManager
