"use client";
import { useState, useEffect, useRef } from 'react';
import styles from "../page.module.css";

const GameVersionComponent = () => {
  const [gameLabel, setGameLabel] = useState('зааыв');
  const [displayText, setDisplayText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const typingRef = useRef({
    timeoutId: null,
    currentIndex: 0,
    currentLabel: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://89.179.78.70:25565/metadata');
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        
        const data = await response.json();
        const label = data.game_versions || 'зааыв';
        setGameLabel(label);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    typingRef.current.currentLabel = gameVersion;
    startTypingAnimation();

    return () => {
      if (typingRef.current.timeoutId) {
        clearTimeout(typingRef.current.timeoutId);
      }
    };
  }, [gameLabel]);

  const startTypingAnimation = () => {
    // Сбрасываем состояние анимации
    if (typingRef.current.timeoutId) {
      clearTimeout(typingRef.current.timeoutId);
    }
    
    typingRef.current.currentIndex = 0;
    setDisplayText('');

    const typeNextLetter = () => {
      if (typingRef.current.currentIndex < typingRef.current.currentLabel.length) {
        const nextChar = typingRef.current.currentLabel[typingRef.current.currentIndex];
        setDisplayText(prev => prev + nextChar);
        typingRef.current.currentIndex += 1;

        const delay = Math.random() * (300 - 100) + 70;
        typingRef.current.timeoutId = setTimeout(typeNextLetter, delay);
      }
    };

    typeNextLetter();
  };

  if (isLoading) return <div className={styles.mine}>Загрузка...</div>;
  if (error) return <div className={styles.mine}>Ошибка: {error}</div>;

  return <div className={styles.nameversion}>{displayText}</div>;
};

export default GameVersionComponent;