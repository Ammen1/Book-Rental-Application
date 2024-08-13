import jwt from 'jsonwebtoken';

export const sendToken = (user, statusCode, res, message) => {
  try {
    console.log('Generating token...');
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    // Remove or minimize token logging in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('Token:', token);
    }

    const expiresIn = parseInt(process.env.COOKIE_EXPIRES_TIME, 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    const expires = new Date(Date.now() + expiresIn);

    res
      .status(statusCode)
      .cookie('token', token, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        success: true,
        message,
        token,
        user,
      });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
