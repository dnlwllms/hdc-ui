import { type ButtonHTMLAttributes, type Ref } from "react";

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: Ref<HTMLButtonElement>
) {
  return <button ref={ref} {...props}></button>;
}
