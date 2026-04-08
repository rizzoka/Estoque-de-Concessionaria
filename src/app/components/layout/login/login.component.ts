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

  usuario!: string;
  senha!: string;

  router = inject(Router); //injeção de dependência do Router (o app.router)
  loginService = inject(LoginService); //injeção de dependência do LoginService (o app.auth)

  logar(){
    
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){ //usuário e senha corretos
          this.loginService.addToken(token); //salva o token no localStorage
          this.router.navigate(['admin/carros']); //redireciona para a página de carros
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
