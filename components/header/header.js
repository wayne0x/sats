import { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors";
import { walletConnect } from "../wallet/walletconnect-connectors";
import Router from "next/router";

import axios from "axios";
import qs from "qs";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  changeUserAC,
  changeLoading,
  updateUserInfo,
  setBrcUserInfo,
  setErcUserInfo,
  changeMessage,
  setBrcUserCliam,
  setErcUserCliam,
} from "../../redux/actions/index";
import { Tooltip } from "@nextui-org/react";
import Airdrop_ABI from "../../api/Airdrop.json";
import Web3 from "web3";

function header(props) {
  // init web3
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  // signature
  let signature = "";
  let cfg = {
    // provider: "https://data-seed-prebsc-1-s1.binance.org:8545",
    // chainId: 97,
    // address: "0x4169c6d6413bE6b56Ae37cb2E58DDa4Cf67B9d80",
    // privateKey:
    //   "0bf08069af1ebae08168fd6d58dfbc4844ed195e65d9eb36ab18469b49e416ab",
    AIRDROP_ADDR: "0xdC624ad749298c811D71DB1Ff51f2CdA84b1f874",
    // TOKEN_ADDR: "0xbd7836f30BaD4d5398c285046DD9Fdeab04F9A91",
  };
  const web3 = new Web3(Web3.givenProvider);
  const airdropContract = new web3.eth.Contract(Airdrop_ABI, cfg.AIRDROP_ADDR);

  let [walletListToggle, setWalletListToggle] = useState(false);
  let [routePath, setRoutePath] = useState("/");

  const store = useStore();
  const stateData = useSelector((state) => {
    return state;
  });
  // changeRedux
  const dispatch = useDispatch();

  // watch route
  useEffect(() => {
    setRoutePath(Router.route);
    // Get Brc20 Accounts
    if (typeof window.unisat !== "undefined") {
      window.unisat.getAccounts().then((accounts) => {
        if (accounts[0]) {
          updatBrcUserInfo(accounts[0]);
          // dispatch(setBrcUserInfo(accounts[0]));
        }
      });
      // changeAccount
      unisat.on("accountsChanged", (accounts) => {
        if (accounts.length == 0) {
          // disconnect();
          dispatch(setBrcUserInfo(null));
        } else {
          // location.reload();
          updatBrcUserInfo(accounts[0]);
          // dispatch(setBrcUserInfo(accounts[0]));
        }
      });
    }
    // Get Erc20 Accounts
    if (
      window &&
      window.ethereum &&
      window.ethereum.selectedAddress &&
      !store.getState().user.ercUserInfo
    ) {
      updatErcUserInfo(window.ethereum.selectedAddress);
      // dispatch(setErcUserInfo(window.ethereum.selectedAddress));
    }
    // changeAccount
    if (window && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length == 0) {
          // disconnect();
          dispatch(setErcUserInfo(null));
        } else {
          // location.reload();
          updatErcUserInfo(accounts[0]);
          // dispatch(setErcUserInfo(accounts[0]));
        }
      });
    }

    // window.ethereum.on("accountsChanged", (accounts) => {
    //   if (accounts.length == 0) {
    //     console.log("未连接");
    //   } else {
    //     console.log(accounts[0]);
    //   }
    // });
    // console.log(window.ethereum.isConnected());
    // Get Erc20 Accounts
    // ethereum.getAccounts().then((res) => {
    //   if (res.length != 0) {
    //     this.networkVersion = ethereum.networkVersion;
    //     this.isLink = true;
    //     this.account = ethereum.selectedAddress;
    //     // 查询是否有令牌
    //     this.validateFirstNft();
    //   } else {
    //     this.isLink = false;
    //     this.account = "";
    //   }
    // });
    // window.ethereum.on("accountsChanged", (accounts) => {
    //   if (accounts.length == 0) {
    //     this.networkVersion = ethereum.networkVersion;
    //     this.isLink = false;
    //     this.account = "";
    //     // this.$store.dispatch("getAccount", null)
    //   } else {
    //     this.account = accounts[0];
    //     // 查询是否有令牌
    //     this.validateFirstNft();
    //   }
    // });
    // window.ethereum.on("chainChanged", (network) => {
    //   this.networkVersion = network;
    // });
  }, [Router.events]);

  // getUserInfo
  const getUserInfo = async () => {
    dispatch(
      changeLoading({
        state: true,
        msg: "Lading...",
      })
    );
    // dispatch(changeLoading(false));
  };

  const editProfile = async () => {
    await getUserInfo();
    await profileShow(true);
  };

  // brc20 Connect
  function brcConnect() {
    if (typeof window.unisat !== "undefined") {
      window.unisat.requestAccounts().then((accounts) => {
        if (accounts[0]) {
          updatBrcUserInfo(accounts[0]);
          // dispatch(setBrcUserInfo(accounts[0]));
        }
      });
    } else {
      alert("UniSat Wallet has not been installed!");
    }
  }

  // show wallet list
  function walletListShow() {
    setWalletListToggle(!walletListToggle);
  }

  // show your profile
  function profileShow(type) {
    setProFileToggle(type);
  }

  // connect Meta Mask
  async function connect(e, type) {
    // Please link Erc wallet first
    if (!store.getState().user.brcUserInfo) {
      dispatch(
        changeMessage({
          type: "warning",
          msg: "Please link Erc wallet first",
        })
      );
      return;
    }
    e.stopPropagation();
    try {
      if (type == "MetaMask") {
        // await activate(injected);
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log(accounts[0]);
        updatErcUserInfo(accounts[0]);
        // dispatch(setErcUserInfo(accounts[0]));
      } else {
        await activate(walletConnect);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      profileShow(false);
      dispatch(setBrcUserInfo(null));
      Router.push("/");
    } catch (ex) {
      console.log(ex);
    }
  }

  async function updatBrcUserInfo(address) {
    airdropContract.methods
      .hasBrcGet(address)
      .call()
      .then((v) => {
        dispatch(setBrcUserCliam(v));
      });
    dispatch(setBrcUserInfo(address));
  }
  async function updatErcUserInfo(address) {
    airdropContract.methods
      .hasErcGet(address)
      .call()
      .then((v) => {
        dispatch(setErcUserCliam(v));
      });
    dispatch(setErcUserInfo(address));
  }

  return (
    <>
      <div className={`box`}>
        <div className={`${styles.title} title`}>
          <div className={styles.logo}>
            <img src="/images/logo.png" />
          </div>
          <div className={styles.btns}>
            <button className="btn icon_btn">
              <img src="/images/twitter.png" />
            </button>
            {stateData.user.brcUserInfo ? (
              <button className="btn green">
                <i className="iconfont icon-btc"></i>
                {`${stateData.user.brcUserInfo.slice(
                  0,
                  4
                )}....${stateData.user.brcUserInfo.slice(
                  stateData.user.brcUserInfo.length - 4,
                  stateData.user.brcUserInfo.length
                )}`}
              </button>
            ) : (
              // onClick={walletListShow}
              <button className="btn" onClick={brcConnect}>
                BRC Connect
              </button>
            )}

            {stateData.user.ercUserInfo ? (
              <button className="btn green">
                <i className="iconfont icon-ETH1"></i>
                {`${stateData.user.ercUserInfo.slice(
                  0,
                  4
                )}....${stateData.user.ercUserInfo.slice(
                  stateData.user.ercUserInfo.length - 4,
                  stateData.user.ercUserInfo.length
                )}`}
              </button>
            ) : (
              // onClick={walletListShow}
              <button className="btn" onClick={(e) => connect(e, "MetaMask")}>
                ERC Connect
              </button>
            )}
          </div>
          <div className={styles.nav}>
            <ul>
              <li className={`${routePath == "/" ? styles.selected : ""}`}>
                <Link href="/">Home</Link>
              </li>
              <li
                className={`${
                  routePath == "/sate-holders" ? styles.selected : ""
                }`}
              >
                <Link href="/sate-holders">Sats Holders</Link>
              </li>
              {/* <li>God Holders</li> */}
            </ul>
          </div>

          {/* wallet connet mask */}
          <div
            className={`mask animate__animated animate__fadeIn animate__faster ${
              walletListToggle ? "show" : ""
            }`}
            onClick={walletListShow}
          >
            <div className={styles.wallet_list}>
              <p className={styles.title}>
                <strong>Sign Up / Log In</strong>
              </p>
              <ul>
                <li onClick={(e) => connect(e, "MetaMask")}>
                  <img src="/images/icn-metamask.svg"></img>Meta Mask
                </li>
                <li onClick={(e) => connect(e, "WalletConnect")}>
                  <svg
                    aria-labelledby="wallet-connect-logo"
                    fill="none"
                    height="100%"
                    viewBox="0 0 164 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title id="wallet-connect-logo">Wallet Connect Logo</title>
                    <path
                      d="M33.4018 19.5383C60.0094 -6.51275 103.149 -6.51275 129.756 19.5383L132.959 22.6735C134.289 23.9761 134.289 26.0879 132.959 27.3905L122.004 38.1157C121.339 38.7669 120.261 38.7669 119.595 38.1157L115.189 33.8011C96.6266 15.6273 66.5315 15.6273 47.9694 33.8011L43.2502 38.4216C42.585 39.0729 41.5065 39.0729 40.8413 38.4216L29.887 27.6965C28.5567 26.3939 28.5567 24.2821 29.887 22.9795L33.4018 19.5383ZM152.411 41.719L162.16 51.2645C163.49 52.567 163.49 54.6789 162.16 55.9814L118.2 99.0231C116.869 100.326 114.712 100.326 113.382 99.0231C113.382 99.0231 113.382 99.0231 113.382 99.0231L82.1815 68.4752C81.8489 68.1495 81.3096 68.1495 80.977 68.4752C80.977 68.4752 80.977 68.4752 80.977 68.4752L49.7772 99.0231C48.4469 100.326 46.2899 100.326 44.9595 99.0231C44.9595 99.0231 44.9595 99.0231 44.9595 99.0231L0.997783 55.9809C-0.332594 54.6783 -0.332594 52.5665 0.997783 51.2639L10.7471 41.7185C12.0775 40.4159 14.2345 40.4159 15.5649 41.7185L46.7658 72.2668C47.0984 72.5925 47.6376 72.5925 47.9702 72.2668C47.9702 72.2668 47.9702 72.2668 47.9702 72.2668L79.1696 41.7185C80.4999 40.4159 82.6569 40.4159 83.9873 41.7184C83.9873 41.7184 83.9873 41.7184 83.9874 41.7184L115.188 72.2668C115.521 72.5924 116.06 72.5924 116.393 72.2668L147.593 41.719C148.923 40.4165 151.08 40.4165 152.411 41.719Z"
                      fill="#3B99FC"
                    ></path>
                  </svg>
                  Wallet Connect
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.slogan} content`}>
          Welcome! The existence of BTC will shatter the dimensional barrier.
          Let us join this commemorative event!
        </div>
        {/* <div className={`content ${styles.nav_box}`}>
          <ul>
            <li>Home</li>
            <li>Sats Holders</li>
            <li>God Holders</li>
          </ul>
        </div> */}
      </div>

      {/* <div className="box">
        <div className={`content ${styles.nav_box}`}>
          <ul>
            <li>Home</li>
            <li>Sats Holders</li>
            <li>God Holders</li>
          </ul>
        </div>
      </div> */}
    </>
  );
}

// header.getInitialProps = async function () {
//   return {
//     walletListToggle: true,
//   };
// };
export default header;
