import style from "./home.module.css";
import classnames from "classnames";

export default function Home() {
  return (
    <div className={classnames(style.homeContainer, style.fadeContainer)}>
      <h2 className={style.homeHeading}>Welcome</h2>
      <h4 className={style.homeSubheading}>What's the point of all this?</h4>
      <p className={style.homeText}>
        Well, this isn't meant to replace your planning but it's more of a
        memory jogger. The games and review that are suggested might be familiar
        to you, but you might also get something you hadn't thought about.
        That's the point. Come in and get some suggestions, try something new,
        rediscover something you already knew.
      </p>
    </div>
  );
}
