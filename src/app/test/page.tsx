'use client'

import React, { useState } from 'react';
import CongratulationsModal from '@/components/CongratulationsModal';

const snakeCount = 7;
const ladderCount = 8;

const Test: React.FC = () => {

  return (
    <div className=''>
        <CongratulationsModal onClose={() => {console.log()}} snakesNumber={snakeCount} laddersNumber={ladderCount} />
    </div>
  );
};

export default Test;
