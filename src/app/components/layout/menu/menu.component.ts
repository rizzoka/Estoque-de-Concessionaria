import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';


@Component({
  selector: 'app-menu',
  imports: [MdbCollapseModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  loginService = inject(LoginService); //para poder usar o serviço de login para verificar se o usuário está autenticado
  usuario!: Usuario;

  constructor(){
    this.usuario = this.loginService.getUsuarioLogado();
  }
}
