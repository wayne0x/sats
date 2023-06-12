import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserAC,
  changeLoading,
  updateUserInfo,
  changeMessage,
} from "../redux/actions/index";

export default function Layout({ children, home }) {
  //状态机内部的数据;
  const stateData = useSelector((state) => {
    // console.log("状态机数据", state);
    return state;
  });
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(changeMessage(false));
  }, 3000);

  return (
    <>
      <div className="message_box animate__animated animate__fadeInDown">
        <div className={`content ${stateData.user.message.type}`}>
          {stateData.user.message.type == "success" ? (
            <i className="iconfont icon-chenggong"></i>
          ) : (
            ""
          )}
          {stateData.user.message.type == "warning" ? (
            <i className="iconfont icon-tixingshixin"></i>
          ) : (
            ""
          )}
          {stateData.user.message.type == "error" ? (
            <i className="iconfont icon-cuowutishitianchong"></i>
          ) : (
            ""
          )}
          {stateData.user.message.msg}
        </div>
      </div>
    </>
  );
}
