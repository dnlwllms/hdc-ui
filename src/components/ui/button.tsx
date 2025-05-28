import { type ButtonHTMLAttributes, type Ref } from "react";

export type ButtonProps = {
  test: string;
};

export function Button(
  props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
  ref: Ref<HTMLButtonElement>
) {
  return <button ref={ref} className="bg-red-500" {...props}></button>;
}
