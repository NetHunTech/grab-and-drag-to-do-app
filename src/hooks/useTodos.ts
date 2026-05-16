import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";
import { reorderTodos } from "../utils/reorder";

export function useTodos() {
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
    setActiveId(active.id)
  }

  function onDragEnd({ active, over }: any) {
    if (!over) {
      setActiveId(null)
      return
    }

    const overStage = over.data?.current?.stage

    if (overStage) {
      moveTodo(active.id, overStage)
      setActiveId(null)
      return
    }

    setTodos(prev => reorderTodos(prev, active.id, over.id))

    setActiveId(null)
  }

  function onDragCancel() {
    setActiveId(null)
  }

  return { 
    todos,
    activeTodo, 
    activeId, 
    addTodo, 
    delTodo, 
    onDragStart, 
    onDragEnd, 
    onDragCancel 
  }
}