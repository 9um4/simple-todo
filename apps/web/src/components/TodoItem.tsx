import type { Todo } from '../types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 0',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.done ? 'line-through' : 'none',
          color: todo.done ? '#999' : '#222',
        }}
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: '#c00',
        }}
      >
        삭제
      </button>
    </li>
  );
}
