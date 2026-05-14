type Todo = {
  id: string
  title: string
  description?: string
  stage: 'todo' | 'doing' | 'done'
}

type TodoColumn = {
  name: string
  tasks: Todo[]
}

type AddTodoProps = {
  onAddTodo: (todo: Todo) => void;
};

export type { Todo, TodoColumn, AddTodoProps }