import React from "react";
import { NextPage } from "next";
import { SignUpPage } from "../components/Body/SignUpPageComponent";
import { useAppDispatch } from "../store";
import { signUp } from "../store/users";

interface Props {}

const SignUpPageContainer: NextPage<Props> = () => {
  const validateId = (_id: string) => Math.random() > 0.5;
  const dispatch = useAppDispatch();
  const onFormSubmit = (
    email: string,
    id: string,
    name: string,
    password: string
  ) => {
    dispatch(signUp({ birth_date: null, email, password, username: id }));
  };
  return <SignUpPage onFormSubmit={onFormSubmit} validateId={validateId} />;
};

SignUpPageContainer.displayName = "SignUpPage";

export default SignUpPageContainer;
