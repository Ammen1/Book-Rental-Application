import jwt from 'jsonwebtoken';

export const generateJWTToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES || '1h', 
  });
};
