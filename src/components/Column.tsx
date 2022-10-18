import { ColumnContainer, ColumnTitle } from "../assets/styles"
import AddNewItem from "./AddNewItem";
import Card from "./Card";

type ColumnProps = {
  text: string;
  children?: React.ReactNode;
};

export const Column = (props: ColumnProps) => {
  
  const onItemAdded=(text: string)=>{
    console.log(text + " has been added.!");
  }
  
  return (
      <ColumnContainer>
        <ColumnTitle>{props.text}</ColumnTitle>
        <Card text="Lear React" />
        <Card text="Lear CSS" />
        <AddNewItem
          addItemHint="+ Add another card"
          onAdded={onItemAdded}
          dark
        ></AddNewItem>
      </ColumnContainer>
    );
};