import { CanActivateFn } from '@angular/router';
import { RoleService } from './role.service';
import { inject } from '@angular/core';

export const writerGuard: CanActivateFn = () => {
  const roleService: RoleService = inject(RoleService);

  //RoleService checks permissions
  return roleService.hasPermission('writer');
};
