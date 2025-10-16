import styles from "./page.module.css";
import Collections from "@/app/collections/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* do links directly replace collections here ie, app layout persists, div and main tags above persist? */}
        <Collections />
      </main>
      {/* <footer className={styles.footer}>
      </footer> */}
    </div>
  );
}
