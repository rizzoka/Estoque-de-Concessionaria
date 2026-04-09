import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';


@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login =  new Login();

  router = inject(Router); //injeção de dependência do Router (o app.router)
  loginService = inject(LoginService); //injeção de dependência do LoginService (o app.auth)

  constructor(){
    this.loginService.removerToken(); //remove o token do localStorage ao acessar a página de login (para garantir que o usuário esteja deslogado)
  }

  logar(){
    
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){ //usuário e senha corretos
          this.loginService.addToken(token); //salva o token no localStorage
          if(this.loginService.hasPermission("ADMIN"))
            this.router.navigate(['admin/carros']);
          else if(this.loginService.hasPermission("USER")) //se for user, redireciona para a página de marcas
          this.router.navigate(['admin/marcas']);
        } else { // ou o usuario ou a senha incorretos
          alert("Login ou senha inválidos!");
        }
      },
      error: erro =>{
        alert("Deu erro");
      }
    });

  }

}
