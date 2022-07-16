import { NextPage } from "next";
import { SignInPage } from "../components/pages/root/SignInPage";
import { signIn } from "../store/users";
import { useAppDispatch } from "../store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {
}

const SignInPageContainer: NextPage<Props> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onFormSubmit = (email: string, password: string) => {
    dispatch(signIn({ email, password }))
      .then(async (action) => {
        if (signIn.fulfilled.match(action)) {
          toast.success(`${action.payload.user.username}님, 환영합니다!`);
          await router.push("/question");
        } else if (signIn.rejected.match(action)) {
          toast.error("로그인에 실패했습니다: " + action.error.message);
        }
      });
  };
  return <SignInPage onFormSubmit={onFormSubmit} />;
};

SignInPageContainer.displayName = "SignInPage";

export default SignInPageContainer;
