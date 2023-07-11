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
// import holders from "../api/holders.json";
import whiteList from "../api/whiteList.json";
import {
  changeUserAC,
  changeLoading,
  updateUserInfo,
  changeMessage,
  setBrcUserCliam,
  setErcUserCliam,
  setNetwork,
  setErcUserInfo,
} from "../redux/actions/index";
import { useWeb3React } from "@web3-react/core";

export default function Holders() {
  let cfg = {
    AIRDROP_ADDR: "0x41968844968593B080CE5573B7D8739Bb13d2dBf",
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

  // let addresss = [];
  // holders.data.detail.forEach((holder) => {
  //   addresss.push(holder.address);
  // });
  // addresss = addresss.filter((item, index, array) => {
  //   return array.indexOf(item) === index;
  // });

  let [whitelist, setwhitelist] = useState(whiteList);
  // let [blockHeight, setBlockHeight] = useState(holders.data.height);
  let [blockHeight, setBlockHeight] = useState(798070);
  let [userRecords, setUserRecords] = useState([]);

  const keccak256 = require("keccak256");
  const leafNodes = whitelist.map((addr) => keccak256(addr));
  const { MerkleTree } = require("merkletreejs");
  const Tx = require("ethereumjs-tx").Transaction;
  const Common = require("ethereumjs-common").default;
  const merkletree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = merkletree.getRoot().toString("hex");
  // console.log("rootHash is: ", rootHash);

  // changeRedux
  const dispatch = useDispatch();

  let addressList = [];
  const getList = async (page) => {
    for (let i = 0; i < 43; i++) {
      // setTimeout(() => {
      await axios
        .get(
          `https://unisat.io/brc20-api-v2/brc20/sats/holders?start=${
            i * 500
          }&limit=500`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => {
          addressList = addressList.concat(res.data.data.detail);
          if (i == 42) {
            console.log(addressList);
          }
        })
        .catch((error) => {});
      // }, i * 1000);
    }
  };

  useEffect(() => {
    // getList();

    // for (let i = 0; i < 40; i++) {
    //   setTimeout(() => {
    //     getList(i * 500);
    //   }, i * 1000);
    // }
    if (window && window.ethereum) {
      dispatch(setNetwork(window.ethereum.networkVersion));
    }
    if (store.getState().user.network == store.getState().user.networkPrd) {
      getUserRecords();
    }
  }, []);

  async function getUserRecords() {
    await airdropContract.methods
      .getUserRecords()
      .call()
      .then((res) => {
        setUserRecords(res);
      });
  }

  // let [isWhiteListUser, setIsWhiteListUser] = useState(false);
  // function getIsWhiteListUser() {
  //   console.log("brcUserInfo:", store.getState().user.brcUserInfo);
  //   const claimingAddr2 = keccak256(store.getState().user.brcUserInfo);
  //   const hexProof = merkletree.getHexProof(claimingAddr2);
  //   airdropContract.methods
  //     .validateBrcAddress(web3.utils.toHex(claimingAddr2), hexProof)
  //     .call()
  //     .then((v) => {
  //       console.log(v);
  //       setIsWhiteListUser(v);
  //     });
  // }

  // getNetWorkId
  const getNetWork = (e, type) => {
    if (!store.getState().user.brcUserInfo) {
      dispatch(
        changeMessage({
          type: "warning",
          msg: "Please link BRC wallet first",
        })
      );
      return;
    }
    if (window.ethereum) {
      web3.eth.net.getId().then((res) => {
        if (res == store.getState().user.networkPrd) {
          connect(e, type);
          setNetwork;
          dispatch(setNetwork(res));
        } else {
          changeNetwork(store.getState().user.networkPrd, e, type);
        }
      });
    } else {
      dispatch(
        changeMessage({
          type: "warning",
          msg: "Your browser does not support connected wallets",
        })
      );
    }
  };
  // changeNetwork
  const changeNetwork = (networkId, e, type) => {
    window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.numberToHex(networkId), //链id
          },
        ],
      })
      .then((res) => {
        getNetWork(e, type);
      })
      .catch((error) => {});
  };
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
        localStorage.setItem("ercDisconnect", false);
      } else {
        await activate(walletConnect);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function cliam(address) {
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
          <div className={`content`}>
            Hint: based on snapshot data of block height [{blockHeight}].
          </div>
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

                  {!stateData.user.whiteListLoading ? (
                    <li>
                      {!stateData.user.isWhiteListUser
                        ? "You're not on the white list"
                        : "1200,000,000,000 Sats"}
                    </li>
                  ) : (
                    <li>
                      <img
                        src="images/loading.gif"
                        className="loading-line"
                      ></img>
                      Just a moment...
                    </li>
                  )}

                  {!stateData.user.isWhiteListUser &&
                  !stateData.user.whiteListLoading &&
                  !stateData.user.addressStateLoading ? (
                    <li>You not win</li>
                  ) : (
                    ""
                  )}
                  {stateData.user.isWhiteListUser &&
                  !stateData.user.whiteListLoading &&
                  !stateData.user.addressStateLoading ? (
                    <li>
                      {stateData.user.ercUserInfo ? (
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
                        <button
                          className="btn"
                          onClick={(e) => getNetWork(e, "MetaMask")}
                        >
                          Connect BSC
                        </button>
                      )}
                    </li>
                  ) : (
                    <li>
                      <img
                        src="images/loading.gif"
                        className="loading-line"
                      ></img>
                      Just a moment...
                    </li>
                  )}
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
              <li>
                {userRecords.length} / {whitelist.length}
              </li>
            </ul>
          </div>
          <div className={`content ${styles.belief_box}`}>
            <div className={`tab_box`}>
              {whitelist.map((item, index) => {
                return (
                  <ul key={item + index}>
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
