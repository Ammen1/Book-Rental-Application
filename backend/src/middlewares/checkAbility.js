import { ForbiddenError } from '@casl/ability';
import { defineAbilitiesFor } from '../abilities/defineAbilities.js';

export const checkAbilities = (action, subject) => {
  return (req, res, next) => {
    const user = req.user; // Assumes user is attached to req after authentication
    const ability = defineAbilitiesFor(user.role);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next(); // Proceed to the next middleware/controller if allowed
    } catch (error) {
      res.status(403).json({ message: 'Forbidden' }); // Respond with forbidden if not allowed
    }
  };
};
