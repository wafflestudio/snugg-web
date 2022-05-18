import { NextPage } from "next";
import { AgoraUnAuthPage } from "../../components/pages/agora/AgoraUnAuthPage";

interface Props {}

const UnAuthPageContainer: NextPage<Props> = () => {
  return <AgoraUnAuthPage />;
};

UnAuthPageContainer.displayName = "UnAuthPage";

export default UnAuthPageContainer;
