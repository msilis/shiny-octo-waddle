import style from "./header.module.css";
import headerLogo from "../../assets/SuzukiGroupClass.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={style.headerContainer} data-testid="header-container">
      <Link to="/">
        <img src={headerLogo} className={style.headerPic} />
      </Link>
    </div>
  );
}
