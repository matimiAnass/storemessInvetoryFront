/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['super admin'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
