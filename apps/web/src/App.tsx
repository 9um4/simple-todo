import { FormEvent, useState } from 'react';
import { useTodoStore } from './stores/useTodoStore';
import { TodoList } from './components/TodoList'

function App() {
  const [text, setText] = useState('');

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearCompletedTodos = useTodoStore(
    (state) => state.clearCompletedTodos,
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  const remainingCount = todos.filter((t) => !t.done).length;

  return (
    <main
      style={{
        maxWidth: 480,
        margin: '40px auto',
        padding: 16,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Zustand Todo</h1>

      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', gap: 8, marginBottom: 16 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          추가
        </button>
      </form>

      <section style={{ marginBottom: 12 }}>
        <span>남은 할 일: {remainingCount}개</span>
      </section>

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
      />

      {todos.some((t) => t.done) && (
        <button
          type="button"
          onClick={clearCompletedTodos}
          style={{
            marginTop: 12,
            padding: '6px 10px',
            fontSize: 12,
            borderRadius: 4,
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          완료된 항목 모두 삭제
        </button>
      )}
    </main>
  );
}

export default App;
