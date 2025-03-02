import { useState } from 'react';
import Image from 'next/image';
import styles from "../page.module.css";

const YourComponent = () => {
  const [editUrl, setEditUrl] = useState('https://modsite.com/coolmod');
  const [isEdited, setIsEdited] = useState(false);

  const handleFocus = (e) => {
    if (!isEdited && e.target.value === 'https://modsite.com/coolmod') {
      setEditUrl('');
    }
  };

  const handleBlur = (e) => {
    if (!e.target.value.trim()) {
      setEditUrl('https://modsite.com/coolmod');
      setIsEdited(false);
    }
  };

  const handleChange = (e) => {
    setEditUrl(e.target.value);
    if (!isEdited) setIsEdited(true);
  };

  return (
    <div className={styles.websitefiles}>
      <div className={styles.webmodloaders}>
        <Image src="/courceforge.png" width={35} height={35} alt="CourceForge" />
        <Image src="/modrinz.png" width={25} height={25} alt="ModRinz" />
      </div>
      <div className={styles.separator}>|</div>
      <div className={styles.editurl}>
        <input
          type="text"
          value={editUrl}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={styles.urlInput}
        />
      </div>
      <div className={styles.separator}>|</div>
      <div className={styles.enter}>
        <Image src="/enter.png" width={29} height={29} alt="Submit" />
      </div>
    </div>
  );
};

export default YourComponent;