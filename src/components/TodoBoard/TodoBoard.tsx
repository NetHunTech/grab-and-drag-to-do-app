import { useEffect, useState } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import AddTodo from "../AddTodo/AddTodo"
import Column from "./TodoColumn"
import type { Todo } from "../../types/todo"

export default function Board() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('tasks')
    return storedTodos ? JSON.parse(storedTodos) : []
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

  function onDragEnd({ active, over }: any) {
    if (!over) return

    console.log("ACTIVE:", active.id)
    console.log("OVER:", over.id)

    moveTodo(String(active.id), over.id as Todo["stage"])
  }

  return (
    <>
        <header>
          {<h1>To-Do App</h1>}
          <AddTodo onAddTodo={addTodo}/>
        </header>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <main className="todo-board">
          <Column 
            name='todo' 
            tasks={todos.filter(task => task.stage === 'todo')} 
            onDelete={delTodo} 
            onMove={moveTodo}
          />
          <Column 
            name='doing' 
            tasks={todos.filter(task => task.stage === 'doing')} 
            onDelete={delTodo} 
            onMove={moveTodo}
          />
          <Column 
            name='done' 
            tasks={todos.filter(task => task.stage === 'done')} 
            onDelete={delTodo} 
            onMove={moveTodo}
          />
        </main>
      </DndContext>
    </>
  )
}