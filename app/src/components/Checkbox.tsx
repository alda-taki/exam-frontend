import React from "react";
import styled from "styled-components";
import colors from "../lib/colors";
import { FiCheck } from "react-icons/fi";

const Container = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid ${colors.gray};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface CheckBoxProps {
  checked: boolean;
  onToggle: () => void;
}

const CheckBox = (props: CheckBoxProps): JSX.Element => {
  return (
    <Container onClick={props.onToggle}>
      {props.checked && <FiCheck size={25} color={colors.green} />}
    </Container>
  );
};

export default CheckBox;
