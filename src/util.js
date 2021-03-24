import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export const formatRating = (rating, reviewCount, maxRating = 5) => {
  const jsx = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    jsx.push(<StarIcon key={`star ${i}`} />);
  }
  if (!Number.isInteger(rating)) {
    jsx.push(<StarHalfIcon key='half star' />);
  }
  const currentRating = Number(jsx.length);
  for (let i = 0; i < maxRating - currentRating; i++) {
    jsx.push(<StarOutlineIcon key={`star outline ${i}`} />);
  }
  if (reviewCount) {
    jsx.push(
      <div
        key={'review count'}
        style={{ display: 'inline', fontSize: '14px' }}
      >{`(${reviewCount})`}</div>
    );
  }
  return jsx;
};
