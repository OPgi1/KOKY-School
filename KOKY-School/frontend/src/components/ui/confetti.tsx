'use client';

import * as React from 'react';
import Confetti from 'react-confetti';

interface ConfettiProps {
  width?: number;
  height?: number;
  colors?: string[];
  recycle?: boolean;
  numberOfPieces?: number;
  initialVelocityX?: number;
  initialVelocityY?: number;
  gravity?: number;
  wind?: number;
  friction?: number;
  opacity?: number;
  onConfettiComplete?: () => void;
}

const ConfettiComponent: React.FC<ConfettiProps> = ({
  width = window.innerWidth,
  height = window.innerHeight,
  colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
  recycle = true,
  numberOfPieces = 200,
  initialVelocityX = 6,
  initialVelocityY = -10,
  gravity = 0.1,
  wind = 0.01,
  friction = 0.99,
  opacity = 1,
  onConfettiComplete,
}) => {
  return (
    <Confetti
      width={width}
      height={height}
      colors={colors}
      recycle={recycle}
      numberOfPieces={numberOfPieces}
      initialVelocityX={initialVelocityX}
      initialVelocityY={initialVelocityY}
      gravity={gravity}
      wind={wind}
      friction={friction}
      opacity={opacity}
      onConfettiComplete={onConfettiComplete}
    />
  );
};

export default ConfettiComponent;