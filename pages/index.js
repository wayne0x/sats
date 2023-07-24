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
  const stateData = useSelector((state) => {
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
          <div className={`title`}>
            <img className={`img-icon`} src="/images/W95-14.png" />
            The Birth of God
          </div>
          <div className={`content ${styles.belief_box}`}>
            <div className={`float_left ${styles.float_left}`}>
              <img src="/images/img01.jpg" />
            </div>
            <div className={`float_right ${styles.float_right}`}>
              <div className={styles.h9}>
                <p>
                  1 Satoshi = 0.00000001 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h8}>
                <p>
                  10 Satoshi = 0.00000010 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h7}>
                <p>
                  100 Satoshi = 0.00000100 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h6}>
                <p>
                  1000 Satoshi = 0.00001000 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h5}>
                <p>
                  10000 Satoshi = 0.00010000 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h4}>
                <p>
                  100000 Satoshi = 0.00100000 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h3}>
                <p>
                  1000000 Satoshi = 0.01000000 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h2}>
                <p>
                  10000000 Satoshi = 0.10000000 <img src="/images/btc.png" />
                </p>
              </div>
              <div className={styles.h1}>
                <p>
                  100000000 Satoshi = 1.00000000 <img src="/images/btc.png" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`box`}>
          <div className={`title`}>
            <img className={`img-icon`} src="/images/W95-145.png" />
            The first post introducing Bitcoin was made on the forum on February
            3, 2009.
          </div>
          <div className={`content ${styles.beginning}`}>
            <div className={`float_left ${styles.float_left}`}>
              <img src="/images/brief-note.png" />
            </div>
            <div className={`float_right ${styles.float_right}`}>
              <div className={`tips`}>
                <p>
                  In February 2009, Satoshi Nakamoto made three significant
                  introductions of the Bitcoin white paper and open-source
                  codebase to the members of the P2P Foundation forum.
                </p>
                <p>
                  The first occasion, which took place on February 11, 2009,
                  marked the public announcement of the Bitcoin project by its
                  creator on the P2P Foundation forum.
                </p>
                <p>
                  Before these events in February, Nakamoto utilized the email
                  system associated with the cryptography mailing list hosted on
                  metzdowd.com.
                </p>
              </div>
              <p className={styles.prospect}>
                Child Boards: BITCOIN,Birth, New Era, Future of Finance.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.who_tokenomics_box}>
          <div className={`box ${styles.who_box} float_left`}>
            <div className={`title`}>
              <img className={`img-icon`} src="/images/W95-89.png" />
              Who Are We
            </div>
            <div className={`content ${styles.who_img}`}>
              <img src="/images/sgpng.png" />
            </div>
          </div>
          <div className={`${styles.tokenomics_content} float_right`}>
            <div className={`box ${styles.tokenomics_box}`}>
              <div className={`title`}>
                <img className={`img-icon`} src="/images/W95-111.png" />
                Tokenomics
              </div>
              <div className={`content ${styles.echarts_content}`}>
                <div className={`tips`}>
                  SG is merely a catalyst for this commemorative initiative,
                  serving to honor the ideas generated by BRC20 and pay tribute
                  to Satoshi Nakamoto. It does not constitute investment advice.
                </div>
                <p className={styles.table_top}>
                  SG tokens issued by SatsGod followers are based on a unique
                  tokenomics model which ensures fairness and success
                </p>
                <div className={styles.echarts_box}>
                  <div className={`float_left ${styles.float_left}`}>
                    <p>
                      Distribution:{" "}
                      <strong className="float_right">No taxes</strong>
                    </p>
                    <ul>
                      <li className={styles.table_header}>
                        <span>Allocation</span>
                        <span>Percentage</span>
                        <span>Description</span>
                      </li>
                      <li>
                        <span>2,100,000,000,000,000</span>
                        <span>100%</span>
                        <span>Total supply</span>
                      </li>
                      <li>
                        <span>2,10,000,000,000,000</span>
                        <span>10%</span>
                        <span>Used to reward BRC20 God holders</span>
                      </li>
                      <li>
                        <span>1890,000,000,000,000</span>
                        <span>90%</span>
                        <span>All into the pool</span>
                      </li>
                    </ul>
                    <p></p>
                  </div>
                  <div className={`float_right ${styles.float_right}`}>
                    <img src="/images/chart.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`box ${styles.address_box}`}>
              <div className={`title`}>
                <img className={`img-icon`} src="/images/W95-141.png" />
                Contract Address
              </div>
              <div className={`content ${styles.contract_content}`}>
                <ul>
                  <li>Contract Address: 0x*****</li>
                  <li>LP Address: 0x****</li>
                  <li>Owner Address: 0x***</li>
                </ul>
                <ul>
                  <li>Owner destruction transaction: 0x........</li>
                  <li>LP destruction transaction: 0x........</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={`box`}>
          <div className={`title`}>
            <img className={`img-icon`} src="/images/W95-9.png" />
            How To Claim
          </div>
          <div className={`content ${styles.step_content}`}>
            <div className={`float_left ${styles.float_left}`}>
              <img src="/images/logo-single.png" height={80} />
            </div>
            <div className={`float_left ${styles.float_right}`}>
              <p>
                <strong>Step 1:</strong> Switch to the "sate-holders" page and
                connect your BRC20 wallet.
              </p>
              <p>
                <strong>Step 2:</strong> Connect other wallets.
              </p>
              <p>
                <strong>Step 3:</strong> Click "Claim" and view your SG balance
                in the wallet.
              </p>
            </div>
          </div>
        </div>

        <div className={`box`}>
          <div className={`content ${styles.salute_content}`}>
            <img className={`img-icon`} src="/images/W95-81.png" />
            Hats off to everyone in the Bitcoin community. Let‘s hold SG and
            witness together.
          </div>
        </div>
        <div className={styles.footer}>
          {/* <div className={`content ${styles.footer}`}> */}
          <p>Everyone takes on a leadership role!</p>
          <p className={styles.version}>
            Powered by SatsGod v 0.1 | SG © 2013-2013, Simple
          </p>
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
}
