import style from "./profile.module.css"

export default function Profile(){

    //TODO hook this up to database so values can be populated from there
    //? Could I reuse the registration form for this?
     
    return(
        <div className={style.profileContainer}>
            <h4>Profile</h4>
            <div className={style.profileFields}>
                <input placeholder="First Name"></input>
                <input placeholder="Last Name"></input>
                <input placeholder="Email"></input>
            </div>
        </div>
    )
}