import { Grid } from '@mui/material';
import BookCard from './BookCard';


const FeaturedBooks = ({ books, handleCardClick }) => (
  <Grid container spacing={2}>
    {books.map((book) => (
      <Grid item xs={12} sm={6} md={4} lg={4} key={book.id}>
        <BookCard book={book} handleCardClick={handleCardClick} />
      </Grid>
    ))}
  </Grid>
);

export default FeaturedBooks;
