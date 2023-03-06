import style from "./header.module.css";
import headerLogo from "../../assets/Suzuki Group Class.png"

export default function Header(){
    return(
        <div className={style.headerContainer}>
            <a href="/"><img src={headerLogo} className={style.headerPic}/></a>
        </div>
    )
}