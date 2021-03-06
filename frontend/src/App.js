import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Form from './components/form/form.component';
import TodoList from './components/todo-list/todo-list.component';

import './App.css';

const App = () => {
	// State
	const [todos, setTodos] = useState([]);

	const addTodo = async (todo) => {
		const newTodo = {
			content: todo.content,
		}
		await axios.post('http://localhost:4222/api/v1/todos', newTodo)
		.then(res => setTodos( prev => [res?.data?.data, ...prev]) )
		.catch(err => console.log((err)))	
		// // setTodos(prevState => [...prevState, todo]);
	};

	const fetchTodos = async () => {
		// TODO: Fetch data from API
		const res = await axios.get('http://localhost:4222/api/v1/todos');

		const resTodos = res.data.data.todos;
		setTodos(resTodos);
	};

	const editTodo = async(id, newContent) => {
		// TODO: Send data to API

		// grupo de contenido de todo actulizado
		const updateTodo = {id, content: newContent}
	
		try {
			
			const res = await axios.put(`http://localhost:4222/api/v1/todos/${id}`, updateTodo)

			console.log(res)

			setTodos(prevState => {
				const currentTodos = prevState;
	
				const todoIndex = currentTodos.findIndex(todo => +todo.id === +id);
	
				const updatedTodo = currentTodos[todoIndex];
	
				updatedTodo.content = newContent;
	
				currentTodos[todoIndex] = updatedTodo;
	
				return currentTodos;
			});
			
			
		} catch (error) {
			console.log('error de actualizacion: ', error)
		}

	};

	const deleteTodo = async(id) => {

		console.log(id)

		await axios.delete(`http://localhost:4222/api/v1/todos/${id}`)
		.then(res => setTodos(prev => prev.filter(todo => todo.id !== id)))
		.catch(err => console.log(err))

		// setTodos(prevState => {
		// 	const currentTodos = prevState;

		// 	const updatedTodos = currentTodos.filter(todo => +todo.id !== +id);

		// 	return [...updatedTodos];
		// });
	};

	// When component is mounted, fetch todos
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div className="app">
			<Form onAddTodo={addTodo} />
			<TodoList onDeleteTodo={deleteTodo} onEditTodo={editTodo} items={todos} />
		</div>
	);
};

export default App;
