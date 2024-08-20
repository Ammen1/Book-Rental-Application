/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import BookCard from './BookCard';

const FeaturedBooks = ({ books, handleCardClick }) => (
  <Grid container spacing={2}>
    {books.map((book) => (
      <Grid 
        item 
        xs={12}  // 1 book per row on extra small screens
        sm={12}  // 1 book per row on small screens
        md={6}  // 1 book per row on medium screens
        lg={4}   // 3 books per row on large screens
        key={book.id}
      >
        <BookCard book={book} handleCardClick={handleCardClick} />
      </Grid>
    ))}
  </Grid>
);

export default FeaturedBooks;
