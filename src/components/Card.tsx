import { CardContainer } from "../assets/styles";

type CardProps = {
    text: string;
}

export default function Card(props : CardProps) {
  return <CardContainer>{props.text}</CardContainer>;
}
