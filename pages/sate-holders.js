import { useState, useEffect, useCallback, useRef, memo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/holders.module.scss";
import Layout, { siteTitle } from "../components/layout/layout";
import Router from "next/router";
import axios from "axios";
import qs from "qs";
import { useDispatch, useSelector, useStore } from "react-redux";
import Web3 from "web3";
import Airdrop_ABI from "../api/Airdrop.json";
import holders from "../api/holders.json";
import {
  changeUserAC,
  changeLoading,
  updateUserInfo,
  changeMessage,
  setBrcUserCliam,
  setErcUserCliam,
} from "../redux/actions/index";
import { useWeb3React } from "@web3-react/core";

export default function Holders() {
  let cfg = {
    // provider: "https://data-seed-prebsc-1-s1.binance.org:8545",
    // chainId: 97,
    // address: "0x4169c6d6413bE6b56Ae37cb2E58DDa4Cf67B9d80",、
    // privateKey:
    //   "0bf08069af1ebae08168fd6d58dfbc4844ed195e65d9eb36ab18469b49e416ab",
    AIRDROP_ADDR: "0xdC624ad749298c811D71DB1Ff51f2CdA84b1f874",
    // TOKEN_ADDR: "0xbd7836f30BaD4d5398c285046DD9Fdeab04F9A91",
  };
  // init web3
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const web3 = new Web3(Web3.givenProvider);
  const airdropContract = new web3.eth.Contract(Airdrop_ABI, cfg.AIRDROP_ADDR);
  const store = useStore();
  const stateData = useSelector((state) => {
    return state;
  });

  let addresss = [];
  holders.data.detail.forEach((holder) => {
    addresss.push(holder.address);
  });
  addresss.push(
    "bc1pp436snntu77e09wvdnwqs2jed44k4rq67u4l3wwrt7e6c7uq7pxqg2evxh"
  );
  addresss = addresss.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });

  let [whitelist, setwhitelist] = useState(addresss);
  let [blockHeight, setBlockHeight] = useState(holders.data.height);
  let [userRecords, setUserRecords] = useState([]);

  const keccak256 = require("keccak256");
  const leafNodes = whitelist.map((addr) => keccak256(addr));
  const { MerkleTree } = require("merkletreejs");
  const Tx = require("ethereumjs-tx").Transaction;
  const Common = require("ethereumjs-common").default;
  const merkletree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  // const rootHash = merkletree.getRoot().toString("hex");
  // console.log("rootHash is: ", rootHash);

  // changeRedux
  const dispatch = useDispatch();

  // let addressList = [];
  // const getList = (page) => {
  //   axios
  //     .get(
  //       `https://unisat.io/brc20-api-v2/brc20/sats/holders?start=${page}&limit=500`,
  //       {
  //         headers: {
  //           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       addressList = addressList.concat(res.data.data.detail);
  //       console.log(addressList);
  //     })
  //     .catch((error) => {});
  // };

  useEffect(() => {
    // for (let i = 0; i < 40; i++) {
    //   getList(i);
    // }
    getUserRecords();
  }, []);

  async function getUserRecords() {
    await airdropContract.methods
      .getUserRecords()
      .call()
      .then((res) => {
        setUserRecords(res);
      });
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
        dispatch(setErcUserInfo(accounts[0]));
      } else {
        await activate(walletConnect);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function cliam(address) {
    // console.log("BRC Address:", store.getState().user.brcUserInfo);
    // console.log("ERC Address:", store.getState().user.ercUserInfo);
    const claimingAddr2 = keccak256(store.getState().user.brcUserInfo);
    const hexProof = merkletree.getHexProof(claimingAddr2);
    let isWhiteListUser = await airdropContract.methods
      .validateBrcAddress(web3.utils.toHex(claimingAddr2), hexProof)
      .call()
      .then((v) => {
        return v;
      });
    // Exists in the whitelist
    if (isWhiteListUser) {
      let hasBrcGetState = await airdropContract.methods
        .hasBrcGet(store.getState().user.brcUserInfo)
        .call()
        .then((v) => {
          return v;
        });
      let hasErcGetState = await airdropContract.methods
        .hasErcGet(store.getState().user.ercUserInfo)
        .call()
        .then((v) => {
          return v;
        });
      // Have you ever claimed it?
      if (!hasBrcGetState && !hasErcGetState) {
        dispatch(
          changeLoading({
            state: true,
            msg: "Please wait while the contract is being processed",
          })
        );
        airdropContract.methods
          .getDrop(
            store.getState().user.brcUserInfo,
            web3.utils.toHex(claimingAddr2),
            hexProof
          )
          .send({
            from: store.getState().user.ercUserInfo,
          })
          .then(async (res) => {
            await getUserRecords();
            dispatch(changeLoading(null));
          })
          .catch(async (error) => {
            console.log(error);
            await getUserRecords();
            dispatch(changeLoading(null));
          });
      } else {
        dispatch(
          changeMessage({
            type: "warning",
            msg: "You've already received the airdrop",
          })
        );
      }
    } else {
      dispatch(
        changeMessage({
          type: "warning",
          msg: "I'm sorry you're not on the white list",
        })
      );
    }
  }

  return (
    <Layout>
      <div className={styles.index}>
        <div className={`box`}>
          <div className={`content`}>说明：基于块高[{blockHeight}]快照</div>
        </div>

        {/* my address */}
        {stateData.user.brcUserInfo ? (
          <div className={`box`}>
            <div className={`title`}>
              <ul className={`tab_nav`}>
                <li>Your Address</li>
                <li>You Win</li>
                <li></li>
              </ul>
            </div>
            <div className={`content ${styles.belief_box}`}>
              <div className={`tab_box`}>
                <ul>
                  <li>{`${stateData.user.brcUserInfo.slice(
                    0,
                    10
                  )}....${stateData.user.brcUserInfo.slice(
                    stateData.user.brcUserInfo.length - 10,
                    stateData.user.brcUserInfo.length
                  )}`}</li>
                  <li>1200,000,000,000 Sats</li>
                  <li>
                    {stateData.user.ercUserInfo ? (
                      // {userRecords.findIndex((user) => user.brc == item) !=
                      //   -1 ? (
                      //     <p className="state success">
                      //       {/* <i className="iconfont icon-24gl-receipt"></i>verify */}
                      //       <button className="btn small green">
                      //         <i className="iconfont icon-24gl-receipt"></i>verify
                      //       </button>
                      //     </p>
                      //   ) : (
                      //     <p className="state">
                      //       <i className="iconfont icon-daiqueren"></i>
                      //     </p>
                      //   )}
                      // btn small green
                      <button
                        className={`btn ${
                          userRecords.findIndex(
                            (user) => user.brc == stateData.user.brcUserInfo
                          ) != -1
                            ? "green"
                            : ""
                        }`}
                        onClick={(e) => cliam(stateData.user.ercUserInfo)}
                      >
                        {userRecords.findIndex(
                          (user) => user.brc == stateData.user.brcUserInfo
                        ) != -1
                          ? "verify"
                          : "Claim"}
                      </button>
                    ) : (
                      // onClick={walletListShow}
                      <button
                        className="btn"
                        onClick={(e) => connect(e, "MetaMask")}
                      >
                        ERC Connect
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* holders */}
        <div className={`box`}>
          <div className={`title`}>
            <ul className={`tab_nav`}>
              <li>Address</li>
              <li>Value</li>
              <li>{userRecords.length} / 20000</li>
            </ul>
          </div>
          <div className={`content ${styles.belief_box}`}>
            <div className={`tab_box`}>
              {whitelist.map((item, index) => {
                return (
                  <ul key={item}>
                    <li>{`${item.slice(0, 10)}....${item.slice(
                      item.length - 10,
                      item.length
                    )}`}</li>
                    <li>1200,000,000,000 Sats</li>
                    <li>
                      {userRecords.findIndex((user) => user.brc == item) !=
                      -1 ? (
                        <p className="state success">
                          {/* <i className="iconfont icon-24gl-receipt"></i>verify */}
                          <button className="btn small green">
                            <i className="iconfont icon-24gl-receipt"></i>verify
                          </button>
                        </p>
                      ) : (
                        <p className="state">
                          <i className="iconfont icon-daiqueren"></i>
                        </p>
                      )}
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
