import { useState } from 'react'
import Card from './components/Card';
import { Column } from './components/Column';
import { AppContainer, CardContainer } from "./assets/styles";
import AddNewItem from './components/AddNewItem';

export function App() {
  const [count, setCount] = useState(0)

  const onItemAdded=(text: string)=>{
    console.log(text + " has been added.!");
  }

  return (
    <AppContainer>
      <Column text="Todo"></Column>
      <AddNewItem
        addItemHint="+ Add new list"
        onAdded={onItemAdded}
      ></AddNewItem>
    </AppContainer>
  );
}

