import { CardContainer } from "../assets/styles";

interface CardProps {
  text: string;
  id: string;
}

export default function Card(props: CardProps) {
  return <CardContainer>{props.text}</CardContainer>;
}
