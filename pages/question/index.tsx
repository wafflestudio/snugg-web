import type { NextPage} from "next";
import MainPage from "../../components/Body/MainPageComponent";
import { useAppSelector, wrapper } from "../../store";
import { listQna } from "../../store/qnaPosts";

const Home: NextPage = () => {
  const posts = useAppSelector((state) => state.qnaPosts.data?.results);
  const loading = useAppSelector((state) => state.qnaPosts.loading);
  return loading ? <div>loading...</div> :
    posts ?
    <MainPage posts={posts} /> :
    <div>error</div>;
  //로그인 로직 추후 추가
};

Home.getInitialProps = wrapper.getInitialPageProps(store => async () => {
  await store.dispatch(listQna({}));
})

Home.displayName = "Home";

export default Home;
