import { useState, useEffect, useCallback, useRef, memo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import Layout, { siteTitle } from "../components/layout/layout";
import Router from "next/router";
import axios from "axios";
import qs from "qs";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  changeUserAC,
  changeLoading,
  updateUserInfo,
} from "../redux/actions/index";

export default function Home() {
  //状态机内部的数据;
  const stateData = useSelector((state) => {
    // console.log("状态机数据", state);
    return state;
  });
  // changeRedux
  const dispatch = useDispatch();

  let [list, setList] = useState([]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <div className={styles.index}>
        <div className={`box`}>
          <div className={`title`}>The Birth of God.</div>
          <div className={`content ${styles.belief_box}`}>
            <h2>100000000 Satoshis = 1 BTC</h2>
            <h3>10000000 Satoshis = 0.1 BTC</h3>
            <h4>1000000 Satoshis = 0.01 BTC</h4>
            <h4>......</h4>
            <h5>10 Satoshis = 0.00000001 BTC</h5>
            <p className={styles.belief}>
              Each Bitcoin can be divided into 100 million Satoshis (Sats),
              similar to how the US dollar can be divided into 100 cents.
              Satoshis are the smallest unit of Bitcoin and are recorded on the
              blockchain. Each Satoshi is approximately equal to 0.00000001
              Bitcoin, which represents the eighth decimal place of Bitcoin. In
              other words, a Satoshi is one millionth of a Bitcoin.
            </p>
          </div>
        </div>

        <div className={`box`}>
          <div className={`title`}>
            The First of 3 February 2009 Forum Posts Introducing Bitcoin
          </div>
          <div className={`content ${styles.beginning}`}>
            <div className={`float_left ${styles.float_left}`}>
              <img src="/images/brief-note.png" />
            </div>
            <div className={`float_right ${styles.float_right}`}>
              <p>
                In February 2009, Satoshi Nakamoto made three significant
                introductions of the Bitcoin white paper and open-source
                codebase to the members of the P2P Foundation forum. The first
                occasion, which took place on February 11, 2009, marked the
                public announcement of the Bitcoin project by its creator on the
                P2P Foundation forum. Before these events in February, Nakamoto
                utilized the email system associated with the cryptography
                mailing list hosted on metzdowd.com.
              </p>
              <p className={styles.prospect}>
                Child Boards:BITCOIN,Birth, New Era, Future of Finance.
              </p>
            </div>
          </div>
        </div>

        <div className={`box`}>
          <div className={`title`}>Who are we</div>
          <div className={`content`}>
            <p>
              We are you and you are us! We are not limited by identity, we are
              one! When BRC20 comes out, this commemorative will start!{" "}
            </p>
            <br />
            <p>
              There are so many Brc20's on Unisat, but we noticed two big and
              small guys. He is Sats and God. Sats are the smallest unit of BTC,
              and Sats have unique meaning and value. Believers of God believe
              that BTC was created by God.
            </p>
            <br />
            <p>
              Since the circulation of Sats is very large, it is not known when
              the end will come. But those who participated in him all firmly
              believed in BTC, just like God's holders.
            </p>
            <br />
            <p>
              So based on this StatsGod was born. We hope that everyone can own
              SG token, so we issue it on BNB with low gas fee, address: xxxxx
            </p>
          </div>
        </div>

        <div className={`box`}>
          <div className={`title`}>
            Tokenomics
            <span>
              SG is merely a catalyst for this commemorative initiative, serving
              to honor the ideas generated by BRC20 and pay tribute to Satoshi
              Nakamoto. It does not constitute investment advice.
            </span>
          </div>
          <div className={`content ${styles.echarts_content}`}>
            <div className={`float_left ${styles.float_left}`}>
              <p>
                SG Token issued by SatsGod follows a unique tokenomics model to
                ensure a fair and successful distribution:
              </p>
              <br />
              <p>Total amount: 2,100,000,000,000,000</p>
              <p>10% is used to reward Sats who support Brc20, God lovers</p>
              <p>90% of all into the pool</p>
              <p>No taxes</p>
              <p>Contract reounced</p>
              <br />
              <p>
                Contract Address: 0x***** LP Address: 0x**** Owner Address:
                0x***
              </p>
            </div>
            <div className={`float_right ${styles.float_right}`}>
              <img src="/images/chart.png" />
            </div>
          </div>
        </div>

        <div className={`box`}>
          <div className={`title`}>How to get</div>
          <div className={`content ${styles.echarts_content}`}>
            <div className={`float_left ${styles.float_left}`}>
              <p>To buy SG Token, follow these simple steps:</p>
              <br />
              <p>
                Step 1: Download and set up a compatible wallet, such as
                MetaMask or Trust Wallet.
              </p>
              <p>
                Step 2: Purchase BNB (BNB) on a cryptocurrency exchange and
                transfer it to your wallet.
              </p>
              <p>
                Step 3: Visit a decentralized exchange like Pankcake and connect
                your wallet.
              </p>
              <p>
                Step 4: Select SatsGod Token (SG) as the desired token and enter
                the amount you'd like to buy. The official token address to
                import is 0xXXXXD3
              </p>
              <p>
                Step 5: Review the transaction details, confirm the swap, and
                enjoy your SG Token!
              </p>
              <br />
              <p>
                *Please note that trading fees and slippage may apply during the
                purchase process.
              </p>
              <br />
              <p>Let us hold SG to pay tribute to our faith!</p>
            </div>
            <div className={`float_right ${styles.float_right}`}>
              <img src="/images/logo-single.png" />
            </div>
          </div>
        </div>

        <div className={`box`}>
          <div className={`title`}>Road Map</div>
          <div className={`content ${styles.road_map}`}>
            <ul>
              <li>Step1</li>
              <li>1.制作网站</li>
              <li>2.发布合约</li>
              <li>3.上Dex</li>
              <li>4.销毁相关地址</li>
              <li>5.发布twitter</li>
            </ul>
            <ul>
              <li>Step2</li>
              <li>1.上CMC，Coingecko</li>
              <li>2.保持twitter更新</li>
            </ul>
            <ul>
              <li>Step3</li>
              <li>1.开发BRC20 Swap</li>
              <li>2.开发BRC 跨链</li>
            </ul>
            <ul>
              <li>终极想法：</li>
              <li>尽我所能把BRC生态与EVM生态连接起来</li>
            </ul>
          </div>
        </div>
        <div className={styles.footer}>
          {/* <div className={`content ${styles.footer}`}> */}
          <p>You are me and I am you and we will act on your orders</p>
          <p className={styles.version}>
            Powered by SatsGod v 0.1 | SG © 2013-2013, Simple
          </p>
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
}