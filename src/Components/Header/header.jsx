import style from "./header.module.css";
import headerLogo from "../../assets/Suzuki Group Class.png"
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <div className={style.headerContainer}>
            <Link to="/">
            <img src={headerLogo} className={style.headerPic}/>
            </Link>
        </div>
    )
}