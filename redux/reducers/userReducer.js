/**
 *
 * @param {} state  仓库数据
 * @param {*} action  通知对象
 * @returns
 */
export default function reducer(
  state = {
    account: "",
    loading: false,
    userInfo: null,
    message: false,
    brcUserInfo: null,
    ercUserInfo: null,
    brcUserCliam: false,
    ercUserCliam: false,
    network: 0,
    /**
     * bsc test 97
     * bsc 56
     */
    networkPrd: 97,
    isWhiteListUser: false,
    whiteListLoading: false,
    addressStateLoading: false,
  },
  action
) {
  switch (action.type) {
    case "updateUser":
      return {
        ...state,
        account: action.payload,
      };
    case "changeLoading":
      return {
        ...state,
        loading: action.payload,
      };
    case "updateUserInfo":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "changeMessage":
      return {
        ...state,
        message: action.payload,
      };
    case "setBrcUserInfo":
      return {
        ...state,
        brcUserInfo: action.payload,
      };
    case "setErcUserInfo":
      return {
        ...state,
        ercUserInfo: action.payload,
      };
    case "setBrcUserCliam":
      return {
        ...state,
        brcUserCliam: action.payload,
      };
    case "setErcUserCliam":
      return {
        ...state,
        ercUserCliam: action.payload,
      };
    case "setNetwork":
      return {
        ...state,
        network: action.payload,
      };
    case "setIsWhiteListUser":
      return {
        ...state,
        isWhiteListUser: action.payload,
      };
    case "setWhiteListLoading":
      return {
        ...state,
        whiteListLoading: action.payload,
      };
    case "setAddressStateLoading":
      return {
        ...state,
        addressStateLoading: action.payload,
      };
    default:
      return state;
  }
}
