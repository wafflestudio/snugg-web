import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/header/UpperHeader.module.scss";
import Magnifier from "../../../Image/magnifier.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";

const UpperHeader = () => {
  const [value, setValue] = useState<string | null>();

  const router = useRouter(); //getServerSideProps는 Pages에서만 사용 가능함. 일반 컴포넌트에서 query string을 가져올 땐 useRouter를 사용한다.
  const me = useAppSelector((state) => state.users.data);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/question/search?content=${value}`);
  };
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(value == null || value == undefined ? "" : e.target.value);
  };
  useEffect(() => {
    const { content } = router.query;
    setValue(content == undefined || content == null ? "" : content.toString());

    //props.content == null || props.content == undefined ? "" : props.content
  }, []);

  return (
    <div className={styles.header1}>
      <span
        onClick={() => {
          router.push("/question");
        }}
        className={styles.headerText}
      >
        SNUGG
      </span>
      <form className={styles.searchLabel} onSubmit={handleSubmit}>
        <Input
          disableUnderline={true}
          className={styles.searchInput}
          type="text"
          placeholder={"검색어를 입력하세요."}
          value={value}
          onChange={handleChange}
        />
        <button className={styles.labelButton}>
          <Image src={Magnifier} />
        </button>
      </form>
      <button
        onClick={() => {
          router.push(`/profile/${me?.user.pk}`); //이렇게 하는게 맞는지 잘 모르겠네용...
        }}
        className={styles.profileEclipse}
      >
        <Image src={Magnifier} />
      </button>
    </div>
  );
};

export default UpperHeader;
