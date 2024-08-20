import { AbilityBuilder, createMongoAbility } from '@casl/ability';

/**
 * Defines the abilities for a given role.
 * 
 * @param {string} role - The role of the user.
 * @returns {Object} The defined abilities.
 */
export const defineAbilitiesFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (role === 'ADMIN') {
    // Admins can manage everything
    can('manage', 'all'); 
  } else if (role === 'USER') {
    // Users can read and update their own profiles
    can('read', 'User', { id: 'own' }); 
    can('update', 'User', { id: 'own' }); 
    can('read', 'Book');
    cannot('delete', 'User', { id: 'own' });
    
    // Users can read books and manage their own rentals
    can('read', 'Book');
    can('create', 'Rental'); 
    can('update', 'Rental', { renterId: 'own' }); 
    can('delete', 'Rental', { renterId: 'own' });
  } else if (role === 'OWNER') {
    // Owners can manage their own books
    can('read', 'Book');
    can('create', 'Book');
    can('update', 'Book', { ownerId: 'own' }); 
    can('delete', 'Book', { ownerId: 'own' }); 
    
    // Owners can read and update their own profiles
    can('read', 'User', { id: 'own' });
    can('update', 'User', { id: 'own' }); 
    cannot('delete', 'User');
    
    // Owners can read rentals related to their books but cannot delete rentals
    can('read', 'Rental', { 'book.ownerId': 'own' }); 
    cannot('delete', 'Rental');
    can('create', 'Category'); 
    can('read', 'Category'); 
  }

  return build();
};
