import type { NextPage } from "next";
import MainPage from "../../components/legacy_pages/MainPageComponent";

const Home: NextPage = () => {
  return <MainPage />; //로그인 로직 추후 추가
};

Home.displayName = "Home";

export default Home;
