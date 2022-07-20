import { NextPage } from "next";
import { SignInPage } from "../components/pages/root/SignInPage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { enhancedApi } from "../store/api/enhanced";
import { errorToString } from "../utility";

interface Props {}

const SignInPageContainer: NextPage<Props> = () => {
  const [signIn] = enhancedApi.useAuthSigninCreateMutation();
  const router = useRouter();
  const onFormSubmit = async (email: string, password: string) => {
    const result = await signIn({ signinServiceRequest: { email, password } });
    if ("data" in result) {
      toast.success(`${result.data.user?.username}님, 환영합니다!`);
      router.push("/question");
    } else {
      toast.error("로그인에 실패했습니다: " + errorToString(result.error));
    }
  };
  return <SignInPage onFormSubmit={onFormSubmit} />;
};

SignInPageContainer.displayName = "SignInPage";

export default SignInPageContainer;
