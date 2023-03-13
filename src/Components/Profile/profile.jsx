import style from "./profile.module.css"

export default function Profile({firstName, lastName, email}){
    return(
        <div className={style.profileContainer}>
            <h4>Profile</h4>
            <div className={style.profileFields}>
                <input placeholder={firstName} className={style.inputField}></input>
                <input placeholder={lastName} className={style.inputField}></input>
                <input placeholder={email} className={style.inputField}></input>
            </div>
        </div>
    )
}