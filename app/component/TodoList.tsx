'use client'
import React, { useState } from 'react'
import '../../app/globals.css'

function TodoList() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<string>('todo')
    const [taskList, setTaskList] = useState<any[]>([])
    const [taskId, setTaskId] = useState<number>(0)

    const addTaskHandler = () => {

        setTaskList(prev => [
            ...prev,
            {
                id: taskId,
                title: title,
                desc: description,
                status: status
            }
        ]);
        setTitle('');
        setDescription('');
        setTaskId(prev => prev + 1)
    };

    console.log(taskList)
    const onDeleteTaskHandler = (index: number) => {
        console.log(index);
        const newArray = taskList.filter((item) => item.id !== index);
        setTaskList(newArray);
    };



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
                            +
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
                                        <div><span className='font-semibold'>Description: </span>{item.desc}</div>
                                        <div><span className='font-semibold'>Status: </span>{item.status}</div>
                                    </div>
                                    <div className='flex flex-col space-y-4'>
                                        <button className='border-1 rounded p-2 bg-yellow-500 text-white'>Edit</button>
                                        <button className='border-1 rounded p-2 bg-red-700 text-white' onClick={() => {
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

export default TodoList
