import React, { ChangeEvent } from "react";
import styled from "styled-components";
import colors from "../lib/colors";

const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 50px;
  border: none;
  font-size: 20px;
  box-sizing: border-box;
  color: ${colors.black};
  padding: 5px;
  font-family: "Arial";
  :focus {
    outline: none;
  }
`;

interface TextInputProps {
  value: string;
  onChange: (txt: string) => void;
  onFinishEdit: () => void;
  placeholder?: string;
}
const TextInput = (props: TextInputProps): JSX.Element => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (!inputRef.current || !isFocused) return;
    if (!props.value) return;
    inputRef.current.addEventListener("keyup", e => {
      if (e.keyCode !== 13) return;
      props.onFinishEdit();
    });
    return inputRef.current.removeEventListener("keyup", e => {
      if (e.keyCode !== 13) return;
    });
  }, [inputRef, isFocused, props, props.value]);
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target) return;
    props.onChange(e.target.value);
  }
  return (
    <>
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={onChange}
        onSubmit={props.onFinishEdit}
        ref={inputRef}
      />
    </>
  );
};

export default TextInput;
