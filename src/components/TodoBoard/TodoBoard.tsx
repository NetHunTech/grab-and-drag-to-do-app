import { useEffect, useState } from "react"
import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core"

import AddTodo from "../AddTodo/AddTodo"
import Column from "./TodoColumn"
import type { Todo } from "../../types/todo"

export default function Board() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('tasks')
    return storedTodos ? JSON.parse(storedTodos) : []
  })

  const [activeId, setActiveId] = useState<string | null>(null)
  const activeTodo = todos.find(task => task.id === activeId)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos)) 
  }, [todos])

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

  function onDragStart({ active }: any) {
    setActiveId(String(active.id))
  }

  function onDragEnd({ active, over }: any) {
    if (!over) return

    const stage = over.data?.current?.stage

    if (!stage) return

    moveTodo(String(active.id), stage)
  }

  function onDragCancel() {
    setActiveId(null)
  }

  return (
    <>
      <header>
        {<h1>To-Do App</h1>}
        <AddTodo onAddTodo={addTodo}/>
      </header>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
        collisionDetection={closestCenter}
      >
        <main className="todo-board">
          <Column 
            name='todo' 
            tasks={todos.filter(task => task.stage === 'todo')} 
            onDelete={delTodo} 
          />
          <Column 
            name='doing' 
            tasks={todos.filter(task => task.stage === 'doing')} 
            onDelete={delTodo} 
          />
          <Column 
            name='done' 
            tasks={todos.filter(task => task.stage === 'done')} 
            onDelete={delTodo} 
          />
        </main>

      <DragOverlay>
        {activeId && activeTodo ? (
          <div className="card dragging-preview">
            <h2>{activeTodo.title}</h2>
            {activeTodo.description && <p>{activeTodo.description}</p>}
          </div>
        ) : null}
      </DragOverlay>
      </DndContext>
    </>
  )
}