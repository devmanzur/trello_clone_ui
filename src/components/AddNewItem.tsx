import { useState } from "react";
import { AddItemButton } from "../assets/styles";
import NewItemForm from "./NewItemForm";

type AddNewItemProps = {
  onAdded(text: string): void;
  addItemHint: string;
  dark?: boolean;
};


export default function AddNewItem(props: AddNewItemProps) {
    const [showForm, setShowForm] = useState(false);

    const onNewItemAdded = (text:string) =>{
        props.onAdded(text);
        setShowForm(false);
    }

    if(showForm){
        return(
          <NewItemForm onAdded={onNewItemAdded} />
        )
    }

  return (
    <AddItemButton dark={props.dark} onClick={() => setShowForm(true)}>
      {props.addItemHint}
    </AddItemButton>
  );
}
