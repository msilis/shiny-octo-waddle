import style from "./about.module.css";
import classnames from "classnames";

const About = () => {
  return (
    <div className={classnames(style.aboutContainer, style.fadeContainer)}>
      <header className={style.headerContainer}>
        <h3 className={style.aboutHeading}>About this site</h3>
      </header>
      <main className={style.mainTextContainer}>
        <p className={style.aboutText}>
          At Suzuki Group Class Ideas, we're dedicated to helping Suzuki violin
          teachers plan engaging and dynamic group classes. Our site offers a
          wide range of suggested games and activities that are designed to
          enhance students' learning and keep classes fun and engaging.<br/><br/> But
          that's not all -- we also offer a variety of tools that allow users to
          create their own games, save games to their profile, and vote on games
          to be added to the main database. This means that our database of
          games and activities is constantly growing and evolving based on the
          input and creativity of our community of users. <br/><br/> Whether you're looking
          for new ideas to spice up your classes, or you want to contribute your
          own ideas and expertise to the larger community, Suzuki Group Class Ideas is the
          perfect resource for Suzuki violin teachers who are passionate about
          providing their students with the best possible learning experience.
        </p>
      </main>
    </div>
  );
}

export default About;

