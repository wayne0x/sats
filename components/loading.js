import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserAC,
  changeLoading,
  updateUserInfo,
} from "../redux/actions/index";

export default function Layout({ children, home }) {
  //状态机内部的数据;
  const stateData = useSelector((state) => {
    // console.log("状态机数据", state);
    return state;
  });

  return (
    <>
      <div className="loading-mask animate__animated animate__fadeIn">
        <div className="gif">
          <p>
            <img src="images/loading.gif"></img>
          </p>
          <p>{stateData.user.loading.msg}</p>
        </div>
      </div>
    </>
  );
}
