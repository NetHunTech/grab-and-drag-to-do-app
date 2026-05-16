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
  
  function moveTodo(todoId: string, newStage: Todo['stage'], insertIndex?: number) {
    setTodos(prev => {
      const filtered = prev.filter(task => task.id !== todoId)
      const updatedTodo = prev.find(task => task.id === todoId)

      if (!updatedTodo) return prev

      updatedTodo.stage = newStage
      const newTodos = [...filtered]

      if (insertIndex === undefined) {
        newTodos.push(updatedTodo)
      } else {
        newTodos.splice(insertIndex, 0, updatedTodo)
      }

      return newTodos
    })
  }

  function onDragStart({ active }: any) {
    setActiveId(active.id)
  }

  function onDragEnd({ active, over }: any) {
    if (!over) {
      setActiveId(null)
      return
    }

    const activeTodo = todos.find(task => task.id === active.id)
    const overTodo = todos.find(task => task.id === over.id)
    const overStage = over.data?.current?.stage

    if (!activeTodo) return

    // CASE 1: drop on column (empty area)
    if (overStage && !overTodo) {
      moveTodo(active.id, overStage)
      setActiveId(null)
      return
    }

    // CASE 2: same column reorder
    if (activeTodo.stage === overTodo?.stage) {
      setTodos(prev => reorderTodos(prev, active.id, over.id))
      setActiveId(null)
      return
    }

    // CASE 3: cross-column insert
    const insertIndex = todos.findIndex(task => task.id === over.id)
    moveTodo(active.id, overTodo!.stage, insertIndex)

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