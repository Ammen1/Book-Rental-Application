import { ForbiddenError } from '@casl/ability';
import { defineAbilitiesFor } from '../abilities/defineAbilities.js';

export const checkAbilities = (action, subject) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' }); // User not authenticated
    }

    const ability = defineAbilitiesFor(user.role); // Pass the user's role to define abilities

    console.log(`Checking ability for action: ${action} on subject: ${subject}`);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next(); // Proceed to the next middleware/controller if allowed
    } catch (error) {
      console.error('Access denied:', error.message);
      res.status(403).json({ message: 'Forbidden', error: error.message }); // Respond with forbidden if not allowed
    }
  };
};
