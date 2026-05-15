import { useEffect, useState } from "react"
import { TodoDatas } from "../../mockTodos"
import AddTodo from "../AddTodo/AddTodo"
import Column from "./TodoColumn"
import type { Todo } from "../../types/todo"

export default function Board() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('tasks')

    if (storedTodos) {
      return JSON.parse(storedTodos)
    }

    return TodoDatas
  })

  function addTodo(newTodo: Todo) {
    setTodos(prev => [...prev, newTodo])
  }

  function delTodo(todoId: string) {
    setTodos(prev => prev.filter(task => task.id !== todoId))
  }

  function moveTodo(todoId: string, newStage: Todo['stage']) {
    setTodos(prev => prev.map(task => 
      task.id === todoId ? {...task, stage: newStage} : task
    ))
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos)) 
  }, [todos])

  const todo = todos.filter(task => task.stage === 'todo')
  const doing = todos.filter(task => task.stage === 'doing')
  const done = todos.filter(task => task.stage === 'done')

  return (
    <>
      <header>
        {<h1>To-Do App</h1>}
        <AddTodo onAddTodo={addTodo}/>
      </header>
      <main className="todo-board">
        <Column 
          name='todo' 
          tasks={todo} 
          onDelete={delTodo} 
          onMove={moveTodo}
        />
        <Column 
          name='doing' 
          tasks={doing} 
          onDelete={delTodo} 
          onMove={moveTodo}
        />
        <Column 
          name='done' 
          tasks={done} 
          onDelete={delTodo} 
          onMove={moveTodo}
        />
      </main>
    </>
  )
}