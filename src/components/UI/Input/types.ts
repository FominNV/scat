import { Dispatch, SetStateAction } from "react";

export interface IInputProps {
  id: string
  name: string
  placeholder: string
  value: string
  type: string
  setState: Dispatch<SetStateAction<string>>
  error?: string
}
