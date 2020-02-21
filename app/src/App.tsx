import React from "react";
import styled from "styled-components";
import TextInput from "./components/TextInput";
import TodoItem from "./components/TodoItem";
import colors from "./lib/colors";
import * as t from "./types";

enum Filter {
  All = 1,
  Active,
  Completed
}

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  padding: 0 15px;
`;

const InputContainer = styled.div`
  padding: 0 15px 0 50px;
  height: 65px;
  border-bottom: 1px solid ${colors.gray};
  display: flex;
  align-items: center;
`;

const FooterButtons = styled.div``;

const ClearCompletedButton = styled.div`
  width: 100px;
  :hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const FilterButton = styled.span<{ isActive: boolean }>`
  margin: 0 5px;
  padding: 0 5px;
  ${props =>
    props.isActive
      ? `
      border: 1px solid ${colors.darkGray};
      border-radius: 2px;
    `
      : ""}
  cursor: pointer;
`;
const BottomControl = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${colors.darkGray};
`;

function App() {
  const [todos, setTodos] = React.useState<t.Todo[]>([]);
  const [text, setText] = React.useState("");
  const [filter, setFilter] = React.useState(Filter.All);

  function deleteTodo(index: number) {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(newTodos);
  }
  function toggleCompleted(index: number) {
    if (index > todos.length) return;
    const newTodos = todos.slice();
    newTodos[index].done = !todos[index].done;
    setTodos(newTodos);
  }
  function editTodo(index: number, txt: string) {
    if (index > todos.length) return;
    const newTodos = todos.slice();
    newTodos[index].text = txt;
    setTodos(newTodos);
  }
  function finishEdit() {
    setTodos([{ text, done: false }, ...todos]);
    setText("");
  }
  function removeFinished() {
    setTodos(todos.filter(t => !t.done));
  }

  const filteredTodos = (() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(t => !t.done);
      case Filter.Completed:
        return todos.filter(t => t.done);
      default:
        return todos;
    }
  })();

  return (
    <Container>
      <InputContainer>
        <TextInput
          placeholder={"What needs to be done?"}
          value={text}
          onChange={setText}
          onFinishEdit={finishEdit}
        />
      </InputContainer>
      {filteredTodos.map((t, i) => (
        <TodoItem
          key={i}
          text={t.text}
          done={t.done}
          onDelete={() => deleteTodo(i)}
          onToggle={() => toggleCompleted(i)}
          onEdit={txt => editTodo(i, txt)}
        />
      ))}
      {!!todos.length && (
        <BottomControl>
          <span>{filteredTodos.length} item left</span>
          <FooterButtons>
            <FilterButton
              isActive={filter === Filter.All}
              onClick={() => setFilter(Filter.All)}
            >
              All
            </FilterButton>
            <FilterButton
              isActive={filter === Filter.Active}
              onClick={() => setFilter(Filter.Active)}
            >
              Active
            </FilterButton>
            <FilterButton
              isActive={filter === Filter.Completed}
              onClick={() => setFilter(Filter.Completed)}
            >
              Completed
            </FilterButton>
          </FooterButtons>
          <ClearCompletedButton onClick={removeFinished}>
            {!!todos.filter(t => t.done).length && "Clear completed"}
          </ClearCompletedButton>
        </BottomControl>
      )}
    </Container>
  );
}

export default App;
