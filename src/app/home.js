"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { GameLabel, GameVersion, VersionBlock } from './components/gamename.js'
import VerticalTextAnimation from "./components/animatedText";
import YourComponent from "./components/url";

const baseUrl = "http://89.179.78.70:25565";

export default function Home() {
  return (
    <div className={styles.page}>
        <div className={styles.lodat}>Загружаем мод на . . .</div>
          <GameLabel />

        {/* УДАЛИТЬ ЭТОТ БЛОК */}
        {/* <div className={styles.versions}>
          <GameVersion />
        </div> */}

        <VersionBlock /> {/* Теперь содержит всю логику версий */}
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
          <div className={styles.blockfiles}>
            <Image
            src="/upload.svg"
            alt="uploadfilesimg"
            width={120}
            height={94}
            />
            <div className="uploadtext">.jar .yml .zip</div>
          </div>
          <div className={styles.sitefiles}></div>
        </div>
        <YourComponent />
    </div>
  );
}

