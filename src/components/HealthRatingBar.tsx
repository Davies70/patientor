import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useState, useEffect } from 'react';
// import patients from '../services/patients';
// import { RatingAndId } from '../types';

import { styled } from '@mui/material/styles';

type BarProps = {
  rating: number;
  showText: boolean;
  id: string;
  healthRating?: number | null;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
});

const HEALTHBAR_TEXTS = [
  '',
  'The patient has a diagnosed condition',
  'The patient has a high risk of getting sick',
  'The patient has a low risk of getting sick',
  'The patient is in great shape',
];

const HealthRatingBar = ({ showText, id, healthRating }: BarProps) => {
  const [rating, setRating] = useState<number | null | undefined>(null);

  useEffect(() => {
    const storedRating = localStorage.getItem(id);
    storedRating ? setRating(Number(storedRating)) : setRating(healthRating);
  }, [id, healthRating]);

  const handleRating = (rating: number | null | undefined) => {
    if (rating) {
      // const object: RatingAndId = { healthRating: rating, id };
      // await patients.changeRating(object);
      localStorage.removeItem(id);
      localStorage.setItem(id, String(rating));
    }
  };
  return (
    <div className='health-bar'>
      <StyledRating
        name='rating'
        value={rating}
        max={4}
        icon={<Favorite fontSize='inherit' />}
        onChange={(_event, value) => {
          handleRating(value);
          console.log(value);
          setRating(value);
        }}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating ? rating : 0]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
