import { useEffect, useState } from 'react';

const VerticalTextAnimation = () => {
  const text = "Залей меня своим модом...";
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const createLetters = () => {
      return text.split('').map((char, index) => {
        const initialOffset = Math.random() * 50 - 25; // Начальное смещение ±25px
        const direction = Math.random() > 0.5 ? 1 : -1;
        const distance = 80 + Math.random() * 80;
        const duration = 3 + Math.random() * 4;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: '50%',
              top: `${15 + index * 5}%`,
              transform: `translate(-50%, ${initialOffset}px)`,
              animation: `float ${duration}s ease-in-out infinite alternate`,
              '--distance': `${direction * distance}px`,
              whiteSpace: 'nowrap',
              fontSize: '2rem',
              opacity: 0.7
            }}
          >
            {char}
          </div>
        );
      });
    };

    setLetters(createLetters());
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      marginLeft: '500px',
      zIndex: -1,
      pointerEvents: 'none',
    }}>
      {letters}
      
      <style jsx global>{`
        @keyframes float {
          from {
            transform: translate(-50%, 0);
          }
          to {
            transform: translate(-50%, var(--distance));
          }
        }
      `}</style>
    </div>
  );
};

export default VerticalTextAnimation;