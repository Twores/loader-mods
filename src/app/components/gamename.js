"use client";
import { useState, useEffect, useRef } from 'react';
import styles from "../page.module.css";

const MetadataDisplay = ({ fieldName, defaultValue, className }) => {
  const [value, setValue] = useState(defaultValue);
  const [displayText, setDisplayText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const typingRef = useRef({
    timeoutId: null,
    currentIndex: 0,
    currentValue: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://89.179.78.70:25565/metadata');
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        
        const data = await response.json();
        // Исправлено: проверка на тип и значение
        const apiValue = data[fieldName];
        const finalValue = typeof apiValue === 'string' && apiValue !== 'undefined' 
          ? apiValue 
          : defaultValue;
        setValue(finalValue);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fieldName, defaultValue]);

  useEffect(() => {
    // Фикс: гарантированное строковое значение
    typingRef.current.currentValue = String(value);
    startTypingAnimation();

    return () => {
      clearTimeout(typingRef.current.timeoutId);
    };
  }, [value]);

  const startTypingAnimation = () => {
    clearTimeout(typingRef.current.timeoutId);
    typingRef.current.currentIndex = 0;
    setDisplayText('');

    const typeNextLetter = () => {
      if (typingRef.current.currentIndex < typingRef.current.currentValue.length) {
        const nextChar = typingRef.current.currentValue[typingRef.current.currentIndex];
        setDisplayText(prev => prev + nextChar);
        typingRef.current.currentIndex += 1;

        const delay = Math.random() * (300 - 100) + 70;
        typingRef.current.timeoutId = setTimeout(typeNextLetter, delay);
      }
    };

    typeNextLetter();
  };

  if (isLoading) return <div className={className}>Загрузка...</div>;
  if (error) return <div className={className}>Ошибка: {error}</div>;

  return <div className={className}>{displayText}</div>;
};

export const GameLabel = () => (
  <MetadataDisplay 
    fieldName="game_label" 
    defaultValue="зааыв" 
    className={styles.mine}
  />
);

export const GameVersion = () => (
  <MetadataDisplay 
    fieldName="game_version" 
    defaultValue="1.19.4"  // Добавлено правильное значение по умолчанию
    className={styles.mineversion}
  />
);