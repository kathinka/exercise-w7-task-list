
import { TaskForm } from "./TaskForm"	// import the TaskForm component
import { TaskList } from "./TaskList"	// import the TaskList component
import { useEffect, useState } from 'react';
import "./Tasks.css"

export const Tasks = () => {
	const [taskList, setTaskList] = useState([])
	const [loading, setIsLoading] = useState(false)
	const [newTodo, setNewTodo] = useState("")

	const API = "https://week-7-backend.onrender.com/tasks"

	// fetch tasks
	const fetchTasks = async () => {
		setIsLoading(true) // set loading to true before fetching the data
		try {
			const response = await fetch(API);
			if(response.ok){
			const tasks = await response.json();
			setTaskList(tasks);
			// set loading to false after fetching the data
		}
	}catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}


	const handleNewTodoChange = (event) => {
		setNewTodo(event.target.value)
		// set a  new ToDo from the value of the textarea defined in the TaskForm component

	}

	const onFormSubmit = async (event) => {
		// define your POST request for new ToDo
		event.preventDefault();

		//make sure the message is not to short
		if (newTodo.trim().length < 10) {
			alert("Task is too short")
			return // stop the function if the task is too short
		}
		// define the new task object
		const newTask = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// send the new task as a JSON string
			body: JSON.stringify({
				description: newTodo,
			}),
		}
		try {
			const response = await fetch(API, newTask)
			if (response.ok) {
				// fetch the tasks again to update the list
				await fetchTasks()
			}
		} catch (error) {
			console.error(error)
		}
		finally {
			// clear the textarea after submitting the task
			setNewTodo("")
		}
	}

	useEffect(() => {
		fetchTasks()
	}, [])

	return (
		<div className="wrapper">
			<TaskForm
				newTodo={newTodo}
				onNewTodoChange={handleNewTodoChange}
				onFormSubmit={onFormSubmit}
			/>
			<TaskList
				loading={loading}
				taskList={taskList}
				setTaskList={setTaskList}
			/>
		</div>
	)
}
