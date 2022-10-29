import React, { useState } from "react";
import {
  NewItemButton,
  NewItemFormContainer,
  NewItemInput,
} from "../assets/styles";
import { useFocus } from "../utils/useFocus";

type NewItemFormProps = {
  onAdded(text: string): void;
};

export default function NewItemForm(props: NewItemFormProps) {
  const [text, setText] = useState("");
  const inputRef = useFocus();
  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (text !== null && text !== "") {
        props.onAdded(text);
      }
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={onEnterPressed}
      />
      <NewItemButton onClick={() => props.onAdded(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
}
