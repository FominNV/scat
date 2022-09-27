import { Dispatch, SetStateAction } from "react";

export interface IInputData {
  id: string
  name: string
  placeholder: string
  type: string
}

export interface IBody {
  username: string
  password: string
}

export type CheckFieldType = (value: string, setError: Dispatch<SetStateAction<string>>) => boolean;
