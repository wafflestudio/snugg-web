import { NextPage } from "next";
import { SignInPage } from "../components/pages/root/SignInPage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { errorToString } from "../utility";
import { useAuthSigninCreateMutation } from "../store/api/injected";
import { selectUserInfo, useAppSelector } from "../store";
import { useEffect } from "react";

interface Props {}

const SignInPageContainer: NextPage<Props> = () => {
  const [signIn, { isSuccess, reset, error }] = useAuthSigninCreateMutation();
  const user = useAppSelector(selectUserInfo);
  const router = useRouter();
  const onFormSubmit = async (email: string, password: string) => {
    await signIn({ signinServiceRequest: { email, password } });
  };
  useEffect(() => {
    if (isSuccess && user) {
      toast.success(`${user.username}님, 환영합니다!`);
      router.push("/question");
      reset();
    } else if (error) {
      toast.error("로그인에 실패했습니다: " + errorToString(error));
    }
  });
  return <SignInPage onFormSubmit={onFormSubmit} />;
};

SignInPageContainer.displayName = "SignInPage";

export default SignInPageContainer;
