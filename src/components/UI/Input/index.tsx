import {
  ChangeEvent, FC, MouseEvent, useCallback, useRef,
} from "react";
import classNames from "classnames";
import  { IInputProps } from "./types";

import "./styles.scss";

const Input: FC<IInputProps> = ({
  id, name, placeholder, value, type, setState, error,
}) => {
  const input = useRef<null | HTMLInputElement>(null);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>(
    (e) => {
      if (e.currentTarget.value || e.currentTarget.value === "") {
        setState(e.currentTarget.value);
      }
    },
    [setState],
  );

  const clearValue = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>(
    (e) => {
      e.preventDefault();
      setState("");
      setTimeout(() => {
        input.current?.focus();
      });
    },
    [setState],
  );

  const inputClassName = classNames("Input", {
    Input_error: error,
  });

  const buttonClassName = classNames("Input__button-clear", {
    "Input__button-clear_hidden": !value,
  });

  return (
    <div className={inputClassName}>
      <label
        className="Input__label"
        htmlFor={id}
      >
        {name}
      </label>

      <input
        className="Input__input"
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        maxLength={25}
        autoComplete="on"
        ref={input}
      />

      <button
        className={buttonClassName}
        onClick={clearValue}
      >
        Clear
      </button>

      <div className="Input__error">{error}</div>
    </div>
  );
};

export default Input;
