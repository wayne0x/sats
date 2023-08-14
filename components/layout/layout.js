import Head from "next/head";
import styles from "./layout.module.scss";
import Link from "next/link";
import Header from "../header/header.js";
import Loading from "../loading.js";
import Message from "../message.js";
import "animate.css";

import { useDispatch, useSelector } from "react-redux";
// import { changeUserAC } from "../../redux/actions/index";

export const siteTitle = "stas";

export default function Layout({ children, home }) {
  const stateData = useSelector((state) => {
    return state;
  });

  return (
    <>
      {/* Message */}
      {stateData.user.message ? <Message></Message> : ""}

      {/* loading */}
      {stateData.user.loading ? <Loading></Loading> : ""}

      {/* container */}
      <div className={styles.container}>
        <Head>
          <link
            rel="stylesheet"
            href="https://at.alicdn.com/t/c/font_3624132_cqhdlyl85th.css"
          />
        </Head>
        <Header></Header>
        <main>{children}</main>
      </div>
    </>
  );
}
