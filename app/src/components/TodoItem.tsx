import React from "react";
import { MdClear } from "react-icons/md";
import styled from "styled-components";
import colors from "../lib/colors";
import CheckBox from "./Checkbox";
import TextInput from "./TextInput";

const TodoContainer = styled.div`
  display: flex;
  min-height: 50px;
  border-bottom: 1px solid ${colors.gray};
  display: flex;
  align-items: center;
  position: relative;
`;

const TextDisplay = styled.div<{ isInactive: boolean }>`
  display: inline-block;
  border: none;
  font-size: 20px;
  box-sizing: border-box;
  color: ${colors.black};
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
  font-family: "Arial";
  flex: 1;
  word-break: break-all;
  text-decoration: ${props => (props.isInactive ? "line-through" : "none")};
  opacity: ${props => (props.isInactive ? 0.5 : 1)};
  :focus {
    outline: none;
  }
`;

const ClearButton = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
interface TodoItemProps {
  text: string;
  done: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (txt: string) => void;
}
const TodoItem = (props: TodoItemProps): JSX.Element => {
  const [isEdit, setIsEdit] = React.useState(false);
  return (
    <TodoContainer>
      <CheckBox checked={props.done} onToggle={props.onToggle} />
      {isEdit ? (
        <TextInput
          value={props.text}
          onChange={props.onEdit}
          onFinishEdit={() => setIsEdit(false)}
        />
      ) : (
        <TextDisplay
          isInactive={props.done}
          onDoubleClick={() => setIsEdit(true)}
        >
          {props.text}
        </TextDisplay>
      )}
      <ClearButton onClick={props.onDelete}>
        <MdClear size={16} color={colors.pink} />
      </ClearButton>
    </TodoContainer>
  );
};

export default TodoItem;
