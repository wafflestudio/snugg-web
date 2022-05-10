import { NextPage } from "next";
import { UnAuthPage } from "../../components/legacy_pages/UnAuthPage";

interface Props {}

const UnAuthPageContainer: NextPage<Props> = () => {
  return <UnAuthPage />;
};

UnAuthPageContainer.displayName = "UnAuthPage";

export default UnAuthPageContainer;
