import React, { useEffect } from 'react';
import '../styles/AlienCrossing.css';

export default function AlienCrossing({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 8500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="alien-crossing-screen">
      <img
        className="alien-crossing-img"
        src="/alien-crossing.png"
        alt=""
        onAnimationEnd={onDone}
      />
    </div>
  );
}
