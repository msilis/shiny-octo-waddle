import style from "./footer.module.css";

export default function Footer(){
    return(
        <div className={style.footerContainer}>
            <p className={style.copyText}> Copyright 2023</p>
        </div>
    )
}