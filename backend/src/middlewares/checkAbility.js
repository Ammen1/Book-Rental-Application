import { defineAbilitiesFor } from '../abilities/defineAbilities.js';
import { ForbiddenError } from '@casl/ability';

export const checkAbilities = (action, subject) => {
  return (req, res, next) => {
    const user = req.user; // Assumes user is already authenticated and attached to req
    const ability = defineAbilitiesFor(user.role);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      return next();
    } catch (error) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};
