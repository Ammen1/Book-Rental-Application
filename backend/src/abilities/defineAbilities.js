import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export const defineAbilitiesFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (role === 'ADMIN') {
    can('manage', 'all'); 
  } else if (role === 'USER') {
    can('read', 'User'); 
    can('update', 'User', { id: 'own' }); 
    cannot('delete', 'User');
    can('read', 'Book');
  } else if (role === 'OWNER') {
    can('read', 'Book');
    can('create', 'Book');
    can('update', 'Book', { ownerId: 'own' }); 
    can('delete', 'Book', { ownerId: 'own' }); 
    can('read', 'User', { id: 'own' });
    can('update', 'User', { id: 'own' }); 
    cannot('delete', 'User');
  }

  return build();
};
