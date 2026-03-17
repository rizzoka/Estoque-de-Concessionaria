import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { AcessoriodetailsComponent } from '../acessoriodetails/acessoriodetails.component';

@Component({
  selector: 'app-acessoriolist',
  imports: [RouterLink, MdbFormsModule, AcessoriodetailsComponent],
  templateUrl: './acessoriolist.component.html',
  styleUrl: './acessoriolist.component.scss'
})
export class AcessorioListComponent {
  
  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0, '');

  @Input("esconderBotoes") esconderBotoes: boolean = false; 
  @Output('retorno') retorno = new EventEmitter<any>(); 

  acessorioService = inject(AcessorioService);

  modalService = inject(MdbModalService);
  @ViewChild('modalAcessorioDetalhe') modalAcessorioDetalhe: any;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();

    let acessorioNovo = history.state.acessorioNovo; 
    let acessorioEditado = history.state.acessorioEditado;

    if (acessorioNovo) {
      acessorioNovo.id = this.lista.length + 1; 
      this.lista.push(acessorioNovo);
    }
    if (acessorioEditado) {
      let indice = this.lista.findIndex((x) => {
        return x.id == acessorioEditado.id;
      });
      this.lista[indice] = acessorioEditado; 
    }
  }

  findAll() {
    this.acessorioService.findAll().subscribe({
      next: (lista) => { 
        this.lista = lista; 
      },
      error: (err) => {
        Swal.fire({
              title: "Ocorreu um erro",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
      },
    });
  }

  deleteById(acessorio: Acessorio) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed && acessorio.id != null && acessorio.id > 0) { 
        this.acessorioService.delete(acessorio.id).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem, 
              text: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAll();
          },
          error: (err) => {
             Swal.fire({
              title: "Ocorreu um erro",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }

  new() {
    this.acessorioEdit = new Acessorio(null, ''); 
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio); 

    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {

    this.findAll();
    this.modalRef.close(); 
  }

  select(acessorio: Acessorio){
    this.retorno.emit(acessorio); 
  }

}
