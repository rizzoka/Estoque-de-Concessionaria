import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carrosdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss',
})
export class CarrosdetailsComponent {
  @Input('carro') carro: Carro = new Carro(0, ''); //decorator @Input para receber o objeto carro do componente pai
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute); //injeção de dependência para acessar os parâmetros da rota
  router2 = inject(Router); //injeção de dependência para navegação(redirecionamento do botao)

  carroService = inject(CarroService);

  constructor() {
    let id = this.router.snapshot.params['id']; //acesso ao parâmetro 'id' da rota
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    //busca no back-end!!

    this.carroService.findById(id).subscribe({
      next: (retorno) => {
        this.carro = retorno;
      },
      error: (err) => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  save() {
    if (this.carro.id !=null && this.carro.id > 0) {
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: "Carro editado com sucesso",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/carros'], {
            state: { carroEditado: this.carro },
          }); //redirecionamento para a rota 'admin/carros' passando o objeto carro como estado
          this.retorno.emit(this.carro); //emite o evento de retorno para fechar a modal após salvar ou editar o carro (é importante estar aq pq como é assincrona, tem chance de bugar se estiver fora do next)
        },
        error: (err) => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });

    } else {
      this.carroService.save(this.carro).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: "Carro adicionado com sucesso",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/carros'], {
            state: { carroNovo: this.carro },
          }); 
          this.retorno.emit(this.carro); 
        },
        error: (err) => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
    

  }
}
