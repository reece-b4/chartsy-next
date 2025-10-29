import styles from "./page.module.css";
import Collections from "@/app/collections/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Collections />
      </main>
    </div>
  );
}
