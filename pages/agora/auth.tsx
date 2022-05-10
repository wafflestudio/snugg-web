import { NextPage } from "next";
import { AuthPage } from "../../components/legacy_pages/AuthPage";

interface Props {}

const AuthPageContainer: NextPage<Props> = () => {
  return <AuthPage />;
};

export default AuthPageContainer;
