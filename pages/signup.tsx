import React from "react";
import { NextPage } from "next";
import { SignUpPage } from "../components/pages/root/SignUpPage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { enhancedApi } from "../store/api/enhanced";
import { errorToString } from "../utility";

interface Props {}

const SignUpPageContainer: NextPage<Props> = () => {
  const [signUp] = enhancedApi.useAuthSignupCreateMutation();
  const validateId = async (_id: string) => true;
  const router = useRouter();
  const onFormSubmit = async (
    email: string,
    id: string,
    name: string,
    password: string
  ) => {
    const result = await signUp({
      signupServiceRequest: { email, password, birth_date: null, username: id },
    });
    if ("data" in result) {
      toast.success(result.data.user.username + "님, 잘 부탁드려요!");
      router.push("/question");
    } else {
      toast.error("회원가입에 실패했습니다: " + errorToString(result.error));
    }
  };
  return <SignUpPage onFormSubmit={onFormSubmit} validateId={validateId} />;
};

SignUpPageContainer.displayName = "SignUpPage";

export default SignUpPageContainer;
