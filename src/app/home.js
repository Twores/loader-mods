"use client";
import Image from "next/image";
import styles from "./page.module.css";
import GameLabelComponent from "./gamename";
const baseUrl = "http://89.179.78.70:25565";

export default function Home() {
  return (
    <div className={styles.page}>
        <div className={styles.lodat}>Загружаем мод на . . .</div>
            <GameLabelComponent/>

        <div className={styles.versions}>
          <ul className={styles.list}>
            <li>
              <div className={styles.mineload}>
                <div className={styles.nameversion}>Fabric</div>
                <div className={styles.numversion}>14.23.4.2765</div>
              </div>
            </li>
            <li className={styles.separator}>/</li>
            <li>
              <div className={styles.mineversion}>1.19.4</div>
            </li>
          </ul>
        </div>
        <div className={styles.statusbar}>
          <div className={styles.start}>
            <Image src="start.svg" alt="" width={74} height={74} />
          </div>
          <div className={styles.init}>
            <Image src="library.svg" alt="" width={74} height={74} />
          </div>
          <div className={styles.startsession}>
            <Image src="launch.svg" alt="" width={74} height={74} />
          </div>
          <div className={styles.post_process}>
            <Image src="thinking.svg" alt="" width={74} height={74} />
          </div>
          <div className={styles.done}>
            <Image src="ok.svg" alt="" width={74} height={74} />
          </div>
        </div>

        <div className={styles.uploadfiles}>
          <div className={styles.blockfiles}></div>
          <div className={styles.sitefiles}></div>
        </div>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

