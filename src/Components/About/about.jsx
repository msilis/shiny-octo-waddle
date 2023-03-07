import style from "./about.module.css";
import classnames from "classnames"

export default function About() {
  return (
    <div className={classnames(style.aboutContainer, style.fadeContainer)}>
      <header className={style.headerContainer}>
        <h3 className={style.aboutHeading}>About this site</h3>
      </header>
      <main className={style.mainTextContainer}>
        <p className={style.aboutText}>This site was made to make the lives of Suzuki violin group teachers easier. <br/>Sign in to see your saved group
        ideas and add new ones. The pieces in Book 1 are tagged with different techniques. <br />Pick a technique to work on in your group and you will 
        receive a list of review pieces that use this technique and a game you can play.</p>
      </main>
    </div>
  );
}
