import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/header/UpperHeader.module.scss";
import Magnifier from "../../../Image/magnifier.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import NextLink from "next/link";

const UpperHeader = () => {
  const [value, setValue] = useState<string>("");

  const router = useRouter(); //getServerSideProps는 Pages에서만 사용 가능함. 일반 컴포넌트에서 query string을 가져올 땐 useRouter를 사용한다.
  const me = useAppSelector((state) => state.users.data);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/question/search?content=${value}`);
  };
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const { content } = router.query;
    setValue(content?.toString() ?? "");

    //props.content == null || props.content == undefined ? "" : props.content
  }, []);

  return (
    <div className={styles.header1}>
      <NextLink href={"/question"}>
        <div className={styles.headerText}>SNUGG</div>
      </NextLink>
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
      {me === null ? (
        <NextLink href={"/signin"}>
          <div className={styles.profileEclipse}>
            <Image src={Magnifier} />
          </div>
        </NextLink>
      ) : (
        <NextLink href={`/profile/${me?.user.pk}`}>
          <div className={styles.profileEclipse}>
            <Image src={Magnifier} />
          </div>
        </NextLink>
      )}
    </div>
  );
};

export default UpperHeader;
