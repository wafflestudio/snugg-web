import { NextPage } from "next";
import { useEffect } from "react";
import { SignInPage } from "../components/Body/SignInPageComponent";
import { signIn } from "../store/users";
import { useAppDispatch, useAppSelector } from "../store";

interface Props {}

const SignInPageContainer: NextPage<Props> = () => {
  const dispatch = useAppDispatch();
  const onFormSubmit = (email: string, password: string) => {
    dispatch(signIn({ email, password }))
      .then((action) => {
        if (signIn.fulfilled.match(action)) {
          alert(`sign in success! ${action.payload.user.username}`);
        } else if (signIn.rejected.match(action)) {
          alert(`sign in failure! ${JSON.stringify(action.error)}`);
        }
      })
      .catch((reason) => {
        alert(`failure! ${reason}`);
      });
  };

  const me = useAppSelector((state) => state.users.data);
  useEffect(() => console.log("me", me), [me]);

  return <SignInPage onFormSubmit={onFormSubmit} />;
};

SignInPageContainer.displayName = "SignInPage";

export default SignInPageContainer;
