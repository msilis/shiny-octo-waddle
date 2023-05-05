import style from "./home.module.css";
import classnames from "classnames";

export default function Home() {
  return (
    <div className={classnames(style.homeContainer, style.fadeContainer)}>
      <h2 className={style.homeHeading}>Welcome</h2>
      <p className={style.homeText}>
        This tool is designed to complement your planning efforts and serve as a
        helpful reminder. While some of the suggested games and reviews may be
        familiar to you, we hope that you will also discover something new that
        you may not have considered before. Our goal is to provide you with
        fresh ideas and inspiration, so feel free to come in and explore. You
        may even rediscover something that you already know and love. Let's
        embrace the joy of trying new things together!
      </p>
    </div>
  );
}
