import style from "./loading.module.css";

export default function Loading() {
  return (
    <div className={style.spinner}>
      <div className={style.r1}></div>
      <div className={style.r2}></div>
      <div className={style.r3}></div>
      <div className={style.r4}></div>
      <div className={style.r5}></div>
    </div>
  );
}
