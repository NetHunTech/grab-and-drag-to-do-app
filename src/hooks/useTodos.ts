import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";

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