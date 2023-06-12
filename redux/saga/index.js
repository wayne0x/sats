import { call, put, takeEvery } from "redux-saga/effects";
import { changeUserAC, changeLoading } from "../actions/index.js";
// import api from "../../http/api";

function* checkItem({ payload }) {
  // const res = yield call(api.dataManage.GetCollectionData,payload)
  yield put(changeUserAC(res.result.name));
}
export default function* index() {
  yield takeEvery("changeUserData", checkItem);
}
