/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Box, Rating, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import numeral from 'numeral'; 
import { Link } from 'react-router-dom';
import { Info as InfoIcon, Share as ShareIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

const MotionCard = motion(Card);

const BookCard = ({ book }) => {
  const [liked, setLiked] = useState(false); 

  // Check if book object and required properties are available
  if (!book || !book.title || !book.author || !book.category) {
    console.error("Invalid book object:", book);
    return null; // or you could render a fallback UI
  }

  const averageRating = book.ratings && book.ratings.length > 0 
    ? book.ratings.reduce((sum, rating) => sum + rating, 0) / book.ratings.length 
    : 3.60; 

  const formattedPrice = book.price === 0 || !book.price 
    ? 'Free' 
    : `${numeral(book.price).format('0,0')} birr`;

  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked); 
  };

  const handleShare = () => {
    const text = `Check out this book: ${book.title} by ${book.author}`;
    const url = window.location.href;

    // Construct the Telegram URL
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    
    // Open Telegram share URL
    window.open(telegramUrl, '_blank');
  };

  return (
    <MotionCard
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        width: { xs: '100%', sm: '90%', md: 300 }, 
        ml: 1,
        transition: 'transform 0.3s ease-in-out',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.000003)',
          border: '1px solid #ddd',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={book.image || "th.jpeg"}
          alt={book.title}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Tooltip title="View Details">
            <IconButton 
              component={Link}
              to={`/book/${book.id}`}
              sx={{ 
                color: '#fff', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } 
              }}
              aria-label="info"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton 
              onClick={handleShare}
              sx={{ 
                color: '#fff', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } 
              }}
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={liked ? "Unlike" : "Like"}>
            <IconButton 
              sx={{ 
                color: liked ? '#f50057' : '#fff',
                backgroundColor: 'rgba(0,0,0,0.5)', 
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } 
              }}
              aria-label="like"
              onClick={handleLike}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="body2">{book.owner.location}</Typography>
          <Typography variant="body2" color="text.secondary">Author: {book.author}</Typography>
          <Typography variant="body2" color="text.secondary">{book.category.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={averageRating} readOnly precision={0.5} />
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {formattedPrice}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MotionCard>
  );
};

export default BookCard;
