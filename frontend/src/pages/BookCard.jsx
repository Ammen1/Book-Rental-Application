import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Box, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import numeral from 'numeral'; 
import {Link } from 'react-router-dom';
const MotionCard = motion(Card);

const BookCard = ({ book, handleCardClick }) => {
  const averageRating = 10 > 0 ? 10/ 3 : 0; 

  // Format the price using numeral.js
  const formattedPrice = book.price === 0 ? 'Free' : numeral(book.price).format('0,0'); 

  return (
    <MotionCard
      sx={{ borderRadius: 2, boxShadow: 3, cursor: 'pointer', '&:hover': { border: '1px solid #ddd' }, width: 250, ml:1 }}
      whileHover={{ scale: 1.005 }}
      onClick={() => handleCardClick(book.id)}
    >
      <CardActionArea>
      <Link to='/book/{book.id}' >
        <CardMedia
          component="img"
          height="170"
          width="400px"
          image="th.jpeg"
          alt={book.title}
        />
        </Link>
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="body2">location: {book.owner.location}</Typography>
          <Typography variant="body2" color="text.secondary">author:{book.author}</Typography>
          <Typography variant="body2" color="text.secondary">category: {book.category.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={averageRating} readOnly precision={0.5} />
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {formattedPrice} birr
          </Typography>
        </CardContent>
      </CardActionArea>
    </MotionCard>
  );
};

export default BookCard;
