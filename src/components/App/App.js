import './App.scss';
import TodoList from '../TodoList/TodoList';
import TodoEdit from '../TodoEdit/TodoEdit';

function App() {
  return (
    <main className="todo">
      <TodoList/>
      <TodoEdit/>
    </main>
  );
}

export default App;
