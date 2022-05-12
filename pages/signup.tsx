import React from "react";
import { NextPage } from "next";
import { SignUpPage } from "../components/pages/root/SignUpPage";
import { useAppDispatch } from "../store";
import { signUp } from "../store/users";
import { useRouter } from "next/router";

interface Props {}

const SignUpPageContainer: NextPage<Props> = () => {
  const validateId = async (_id: string) => true;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onFormSubmit = (
    email: string,
    id: string,
    name: string,
    password: string
  ) => {
    dispatch(signUp({ birth_date: null, email, password, username: id }))
      .then((action) => {
        if (signUp.fulfilled.match(action)) {
          alert(`sign up success! ${action.payload.user.username}`);
          router.push("/question");
        } else if (signUp.rejected.match(action)) {
          alert(`sign in failure! ${JSON.stringify(action.error)}`);
        }
      })
      .catch((reason) => {
        alert(`failure! ${reason}`);
      });
  };
  return <SignUpPage onFormSubmit={onFormSubmit} validateId={validateId} />;
};

SignUpPageContainer.displayName = "SignUpPage";

export default SignUpPageContainer;
