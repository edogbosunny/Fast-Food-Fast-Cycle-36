const isIncorrect = value => (
  value === 'new'
    || value === 'processing'
    || value === 'pending'
     || value === 'completed'
);

export default isIncorrect;
