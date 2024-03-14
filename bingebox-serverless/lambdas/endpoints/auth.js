import jwt from 'jsonwebtoken';

export const verifyToken = async (token) => {
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error(err); // Log the error for debugging
    throw new Error('Forbidden');
  }
};

export const getUserId = async (token) => {
  try {
    const decoded = await verifyToken(token);
    return decoded.sub;
  } catch (err) {
    throw new Error('Unauthorized');
  }
};