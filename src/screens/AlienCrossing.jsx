import React, { useEffect } from 'react';
import AlienHero from '../components/AlienHero.jsx';
import '../styles/AlienCrossing.css';

export default function AlienCrossing({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 8500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="alien-crossing-screen">
      <div className="alien-crossing-img" onAnimationEnd={onDone}>
        <AlienHero />
      </div>
    </div>
  );
}
