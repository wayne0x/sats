export const changeUserAC = (payload) => {
  return {
    type: "updateUser",
    payload,
  };
};

export const changeLoading = (payload) => {
  return {
    type: "changeLoading",
    payload,
  };
};

export const updateUserInfo = (payload) => {
  return {
    type: "updateUserInfo",
    payload,
  };
};

export const changeMessage = (payload) => {
  return {
    type: "changeMessage",
    payload,
  };
};

export const setBrcUserInfo = (payload) => {
  return {
    type: "setBrcUserInfo",
    payload,
  };
};
export const setErcUserInfo = (payload) => {
  return {
    type: "setErcUserInfo",
    payload,
  };
};
export const setBrcUserCliam = (payload) => {
  return {
    type: "setBrcUserCliam",
    payload,
  };
};
export const setErcUserCliam = (payload) => {
  return {
    type: "setErcUserCliam",
    payload,
  };
};
export const setNetwork = (payload) => {
  return {
    type: "setNetwork",
    payload,
  };
};
export const setIsWhiteListUser = (payload) => {
  return {
    type: "setIsWhiteListUser",
    payload,
  };
};
