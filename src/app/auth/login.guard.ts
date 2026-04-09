import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  
 let loginService = inject(LoginService); 

 if(loginService.hasPermission("USER") && state.url == '/admin/carros'){ // se o user tentar acessar a rota de carros, ele nn vai poder
  alert("Você não tem permissão para acessar essa página!");
  return false;
 }
  
  return true;
};
