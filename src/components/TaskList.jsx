import { formatDistance } from 'date-fns';


export const TaskList = ({ loading, taskList, setTaskList }) => {
	if (loading) {
		return <h1>Loading in progress...</h1>
	} else if (taskList.length === 0) {
		return <h1>No tasks available</h1>
	}

	const onTaskCheckChange = (task) => {
		const updatedTask = { ...task, isChecked: !task.isChecked }
		const APITASKS = `https://week-7-backend.onrender.com/tasks/${task._id}/check`
		const checkedList = {
			method: "POST",
			headers: { updatedTask, "Content-Type": "application/json" },
			// send the new task as a JSON string
			body: JSON.stringify({
				isChecked: updatedTask.isChecked,
			}
			),
		}

		fetch(APITASKS, checkedList)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error)
			})
		setTaskList((taskList) =>
			taskList.map((singleTask) =>
				singleTask._id === task._id ? updatedTask : singleTask
			)
		)
	}

	return (
		<section className="tasks">
			{taskList.map((task) => (
				<div key={task._id} className="task">
					<input
						onChange={() => onTaskCheckChange(task)}
						type="checkbox"
						checked={task.isChecked}
					/>
					<h4>{task.description}</h4>
					<p>{formatDistance(new Date(task.date), new Date(), {
						addSuffix: true,
					})}
					</p>
				</div>
			))
			// reverse the list to show the last task first
			.reverse()
				// slice the taskList to show only the last 10 tasks
			.slice(0, 10)
			}
		</section>
	);
}


