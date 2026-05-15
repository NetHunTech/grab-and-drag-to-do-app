import { useEffect, useState } from "react"
import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core"

import AddTodo from "../AddTodo/AddTodo"
import Column from "./TodoColumn"
import Card from "./TodoCard"
import type { Todo, ActiveId } from "../../types/todo"

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
    if (!over) {
      setActiveId(null)
      return
    }

    const stage = over.data?.current?.stage

    if (!stage) {
      setActiveId(null)
      return
    }

    moveTodo(String(active.id), stage)

    setActiveId(null)
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
            activeId={activeId}
          />
          <Column 
            name='doing' 
            tasks={todos.filter(task => task.stage === 'doing')} 
            onDelete={delTodo} 
            activeId={activeId}
          />
          <Column 
            name='done' 
            tasks={todos.filter(task => task.stage === 'done')} 
            onDelete={delTodo} 
            activeId={activeId}
          />
        </main>

      <DragOverlay>
        {activeTodo ? (
          <Card
            id={activeTodo.id}
            title={activeTodo.title}
            description={activeTodo.description}
            stage={activeTodo.stage}
            onDelete={() => {}}
          />
        ) : null}
      </DragOverlay>
      </DndContext>
    </>
  )
}