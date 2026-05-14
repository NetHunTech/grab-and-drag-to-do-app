import type { FormEvent } from "react";
import type { Todo, AddTodoProps } from "../../types/todo";

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget;
    const formData = new FormData(form)
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      stage: "todo",
    }

    onAddTodo(newTodo)
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <label htmlFor="title">Task Title</label>
      <input name="title" type="text" placeholder="Task" required/>

      <label htmlFor="desc">Add description (optional):</label>
      <textarea name="description" id="description" cols={30} rows={5} placeholder="Description"></textarea>

      <button type="submit">Add Todo</button>
    </form>
  )
}