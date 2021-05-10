/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

interface RateStartsProps {
  stars: number;
}

const RateStarts: React.FC<RateStartsProps> = ({ stars }) => {
  const [starsNumber, setStarsNumber] = useState<string[]>([]);

  useEffect(() => {
    const arr: string[] = [];
    let cont = stars;
    for (let index = 0; index < 5; index += 1) {
      if (cont > 0) {
        arr.push('selected');
      } else {
        arr.push('unselected');
      }
      cont -= 1;
    }
    setStarsNumber(arr);
  }, [stars]);
  return (
    <div>
      {starsNumber &&
        starsNumber.map((item, index) => (
          <AiFillStar
            key={index}
            style={{ color: item === 'selected' ? '#feb906' : '#a3a3a3' }}
          />
        ))}
    </div>
  );
};

export default RateStarts;
