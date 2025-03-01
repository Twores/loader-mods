"use client";
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import styles from "../page.module.css";

// 1. Создаем контекст для метаданных
const MetadataContext = createContext(null);


// 2. Провайдер данных
export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => { // Функция объявлена как async
      try {
        const response = await fetch('http://89.179.78.70:25565/metadata');
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MetadataContext.Provider value={{ metadata, loading, error }}>
      {children}
    </MetadataContext.Provider>
  );
};

// 3. Хук для доступа к данным
const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
};

// 4. Компонент с анимацией
const AnimatedText = ({ value, defaultValue, className }) => {
  const [displayText, setDisplayText] = useState('');
  const typingRef = useRef({
    timeoutId: null,
    currentIndex: 0,
    currentValue: ''
  });

  useEffect(() => {
    typingRef.current.currentValue = String(value || defaultValue);
    startTypingAnimation();

    return () => {
      clearTimeout(typingRef.current.timeoutId);
    };
  }, [value, defaultValue]);

  const startTypingAnimation = () => {
    clearTimeout(typingRef.current.timeoutId);
    typingRef.current.currentIndex = 0;
    setDisplayText('');

    const typeNextLetter = () => {
      if (typingRef.current.currentIndex < typingRef.current.currentValue.length) {
        const nextChar = typingRef.current.currentValue[typingRef.current.currentIndex];
        setDisplayText(prev => prev + nextChar);
        typingRef.current.currentIndex += 1;
        typingRef.current.timeoutId = setTimeout(
          typeNextLetter, 
          Math.random() * (300 - 100) + 70
        );
      }
    };

    typeNextLetter();
  };

  return <div className={className}>{displayText}</div>;
};

// Новые компоненты для модлоадера
export const ModLoaderLabel = () => {
  const { metadata, loading, error } = useMetadata();

  if (loading) return <div className={styles.nameversion}>Загрузка...</div>;
  if (error) return <div className={styles.nameversion}>Ошибка: {error}</div>;

  return (
    <AnimatedText 
      value={metadata?.modloader_label}
      defaultValue="tModLoader"
      className={styles.nameversion}
    />
  );
};

export const ModLoaderVersion = () => {
  const { metadata, loading, error } = useMetadata();
  const version = metadata?.modloader_version;

  if (loading) return <div className={styles.numversion}>Загрузка...</div>;
  if (error) return <div className={styles.numversion}>Ошибка: {error}</div>;
  if (!version) return null;

  return (
    <AnimatedText 
      value={version}
      defaultValue=""
      className={styles.numversion}
    />
  );
};

// Компонент для условного отображения
export const ModLoaderInfo = () => {
  const { metadata } = useMetadata();
  const version = metadata?.modloader_version;
  const label = metadata?.modloader_label;

  if (!label) return null
  else if (!version) {
    return (
      <>
        <li>
          <div className={styles.mineload}>
            <ModLoaderLabel />
          </div>
        </li>
        <li className={styles.separator}>/</li>
      </>
    );

  } else {
    return (
      <>
        <li>
          <div className={styles.mineload}>
            <ModLoaderLabel />
            <ModLoaderVersion />
          </div>
        </li>
        <li className={styles.separator}>/</li>
      </>
    );

  }


};

// Модифицируем компоненты разделителей
const SmartSeparator = () => {
  const { metadata } = useMetadata();
  const hasNextElement = Boolean(metadata?.fabric_version || metadata?.modloader_version);

  if (!hasNextElement) return null;

  return <li className={styles.separator}>/</li>;
};

// Обновленный FabricInfo
export const FabricInfo = () => {
  const { metadata } = useMetadata();
  const version = metadata?.fabric_version;

  if (!version) return null;
  return (
    <>
      <li>
        <div className={styles.mineload}>
          <div className={styles.nameversion}>Fabric</div>
          <div className={styles.numversion}>{version}</div>
        </div>
      </li>
      <SmartSeparator />
    </>
  );
};

// Обновленный блок версий
export const VersionBlock = () => {
  const { metadata } = useMetadata();
  
  return (
    <div className={styles.versions}>
      <ul className={styles.list}>
        <ModLoaderInfo />
        <FabricInfo />
        <li>
          <GameVersion />
        </li>
      </ul>
    </div>
  );
};


// 5. Компоненты для отображения
export const GameLabel = () => {
  const { metadata, loading, error } = useMetadata();
  
  if (loading) return <div className={styles.mine}></div>;
  if (error) return <div className={styles.mine}>Ошибка: {error}</div>;

  return (
    <AnimatedText 
      value={metadata?.game_label}
      defaultValue="зааыв"
      className={styles.mine}
    />
  );
};

export const GameVersion = () => {
  const { metadata, loading, error } = useMetadata();

  if (loading) return <div className={styles.mineversion}>Загрузка...</div>;
  if (error) return <div className={styles.mineversion}>Ошибка: {error}</div>;

  return (
    <AnimatedText 
      value={metadata?.game_version}
      defaultValue="1.19.4"
      className={styles.mineversion}
    />
  );
};