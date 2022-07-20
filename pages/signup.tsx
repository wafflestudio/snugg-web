import React from "react";
import { NextPage } from "next";
import { SignUpPage } from "../components/pages/root/SignUpPage";
import { useAppDispatch } from "../store";
import { signUp } from "../store/users";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
          toast.success(action.payload.user.username + "님, 잘 부탁드려요!");
          router.push("/question");
        } else if (signUp.rejected.match(action)) {
          toast.error("회원가입에 실패했습니다: " + action.error.message);
        }
      });
  };
  return <SignUpPage onFormSubmit={onFormSubmit} validateId={validateId} />;
};

SignUpPageContainer.displayName = "SignUpPage";

export default SignUpPageContainer;
