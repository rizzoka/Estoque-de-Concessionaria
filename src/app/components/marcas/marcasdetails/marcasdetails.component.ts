import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcasdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input('marca') marca : Marca = new Marca(0, '');
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute); //injeção de dependência para acessar os parâmetros da rota
  router2 = inject(Router); //injeção de dependência para navegação(redirecionamento do botao)

  marcaService = inject(MarcaService);

  constructor() {
    let id = this.router.snapshot.params['id']; //acesso ao parâmetro 'id' da rota
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    //busca no back-end!!

    this.marcaService.findById(id).subscribe({
      next: (retorno) => {
        this.marca = retorno;
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
    if (this.marca.id !=null && this.marca.id > 0) {
      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: "Marca editada com sucesso",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/marcas'], {
            state: { marcaEditada: this.marca },
          }); //redirecionamento para a rota 'admin/marcas' passando o objeto marca como estado
          this.retorno.emit(this.marca); //emite o evento de retorno para fechar a modal após salvar ou editar a marca (é importante estar aq pq como é assincrona, tem chance de bugar se estiver fora do next)
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
      this.marcaService.save(this.marca).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: "Marca adicionada com sucesso",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/marcas'], {
            state: { marcaNova: this.marca },
          }); 
          this.retorno.emit(this.marca); 
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
