import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainPage from "../components/Body/MainPageComponent";

const Home: NextPage = () => {
  return <MainPage></MainPage>; //로그인 로직 추후 추가
};

Home.displayName = "Home";

export default Home;
