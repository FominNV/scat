import { FC, useMemo } from "react";
import ReactLoading from "react-loading";
import  { IButtonProps } from "./types";

import "./styles.scss";

const Button: FC< IButtonProps> = ({ name, loading }) => {
  const buttonInnerValue = useMemo<JSX.Element | string>(() => {
    if (loading) {
      return (
        <div className="Button__loading">
          <ReactLoading
            width={26}
            height={26}
            type="spin"
            color="black"
          />
        </div>
      );
    }
    return name;
  }, [name, loading]);

  return (
    <button
      className="Button"
      disabled={loading}
    >
      {buttonInnerValue}
    </button>
  );
};

export default Button;
