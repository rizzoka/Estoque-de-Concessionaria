import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acessoriodetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriodetails.component.html',
  styleUrl: './acessoriodetails.component.scss'
})
export class AcessoriodetailsComponent {

  @Input('acessorio') acessorio : Acessorio = new Acessorio(0, '');
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute); 
  router2 = inject(Router); 

  acessorioService = inject(AcessorioService);

  constructor() {
    let id = this.router.snapshot.params['id']; 
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {

    this.acessorioService.findById(id).subscribe({
      next: (retorno) => {
        this.acessorio = retorno;
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
    if (this.acessorio.id !=null && this.acessorio.id > 0) {
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: "Acessório editado com sucesso",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/acessorios'], {
            state: { acessorioEditado: this.acessorio },
          }); 
          this.retorno.emit(this.acessorio); 
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
      this.acessorioService.save(this.acessorio).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: "Acessório adicionado com sucesso",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/acessorios'], {
            state: { acessorioNovo: this.acessorio },
          }); 
          this.retorno.emit(this.acessorio); 
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
