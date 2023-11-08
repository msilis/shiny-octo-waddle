import { PAGE_TEXT } from "../../Utilities/Config/ui-text";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <div className={style.footerContainer} data-testid="footer-container">
      <p className={style.copyText}>{PAGE_TEXT.footerCopyright}</p>
    </div>
  );
}
