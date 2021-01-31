import { ReactComponent as Mail } from "assets/images/icon-mail.svg";
import { ReactComponent as Password } from "assets/images/icon-pass.svg";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Service from "service";
import "./SignInPage.scss";

const SignInPage = () => {
  //FIXME: Use the default state for an easier experience
  const [form, setForm] = useState({
    userId: "firstUser",
    password: "example",
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);

    localStorage.setItem("token", resp);
    history.push("/todo");
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="loginPage">
      <form className="loginPage__form" onSubmit={signIn}>
        <h2 className="loginPage__title">LOGIN</h2>

        <div className="loginPage__wraperInput">
          <Mail className="loginPage__wraperInput--icon" />
          <input
            id="user_id"
            name="userId"
            value={form.userId}
            onChange={onChangeField}
          />
        </div>

        <div className="loginPage__wraperInput">
          <Password className="loginPage__wraperInput--icon" />
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChangeField}
          />
        </div>

        <button className="loginPage__btnSubmit" type="submit">
          Sign in
        </button>

        <p className="loginPage__quote">Created by Nam Truong Thanh</p>
        <p className="loginPage__quote">
          <a href="mailto:truongthanhnamdev@gmail.com">
            truongthanhnamdev@gmail.com
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
