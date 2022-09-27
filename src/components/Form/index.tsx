import {
  FC, FormEvent, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import classNames from "classnames";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { dataInputs } from "./data";
import { CheckFieldType, IBody } from "./types";

import "./styles.scss";

const Form: FC = () => {
  const [username, setUsername] = useState<string>("testuser@tt.ru");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("TPipZn2h");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const checkField = useCallback<CheckFieldType>((value, setError) => {
    if (!value.trim()) {
      setError("This field must be more than 5 chars.");
      return false;
    }
    setError("");
    return true;
  }, []);

  const postData = useCallback<VoidFunc<void>>(async () => {
    const body: IBody = { username, password };
    const response = await fetch(
      "http://neurodoc.online/api/api/authenticate",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          Authorization: "Bearer d7e1bdd1e12f28244fba502007c5022b1457cda3",
        },
        mode: "no-cors",
        body: JSON.stringify(body),
      },
    );
    console.log(response);
  }, [username, password]);

  const onSubmitHandler = useCallback<EventFunc<FormEvent>>(
    async (e) => {
      e.preventDefault();
      setSubmitError(null);

      checkField(username, setUsernameError);
      checkField(password, setPasswordError);

      if (checkField(username, setUsernameError) && checkField(password, setPasswordError)) {
        setLoading(true);

        try {
          await postData();
          setLoading(false);
        } catch (err) {
          setSubmitError("Invalid fetch!");
          setLoading(false);
        }
      }
    },
    [username, password, checkField, setUsernameError, setPasswordError, postData],
  );

  const inputs = useMemo<ReactNode>(() => {
    const valuesArray = [username, password];
    const errorsArray = [usernameError, passwordError];
    const setStatesArray = [setUsername, setPassword];

    return dataInputs.map((elem, i) => (
      <Input
        key={elem.id}
        id={elem.id}
        name={elem.name}
        type={elem.type}
        placeholder={elem.placeholder}
        value={valuesArray[i]}
        setState={setStatesArray[i]}
        error={errorsArray[i]}
      />
    ));
  }, [
    username,
    password,
    usernameError,
    passwordError,
    setUsername,
    setPassword,
  ]);

  const errorClassName = classNames("Form__error", {
    Form__error_hidden: !submitError,
  });

  useEffect(() => {
    if (usernameError && username.trim()) {
      setUsernameError("");
    }
  }, [usernameError, username]);

  useEffect(() => {
    if (passwordError && password.trim()) {
      setPasswordError("");
    }
  }, [passwordError, password]);

  return (
    <form
      className="Form"
      onSubmit={onSubmitHandler}
    >
      {inputs}
      <Button
        name="Submit"
        loading={loading}
      />

      <div className={errorClassName}>{submitError}</div>
    </form>
  );
};

export default Form;
