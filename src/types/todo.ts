type Todo = {
  id: string
  title: string
  description?: string
  stage: 'todo' | 'doing' | 'done'
}


type AddTodoProps = {
  onAddTodo: (todo: Todo) => void
}

type TodoCardProps = Todo & {
  onDelete: () => void
}

type ActiveId = {activeId: string | null}

type TodoColumn = ActiveId &{
  name: string
  tasks: Todo[]
  onDelete: (id: string) => void
}

export type { Todo, TodoColumn, AddTodoProps, TodoCardProps, ActiveId }