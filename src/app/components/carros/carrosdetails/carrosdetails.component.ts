import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessorioListComponent } from '../../acessorios/acessoriolist/acessoriolist.component';
import { Acessorio } from '../../../models/acessorio';

@Component({
  selector: 'app-carrosdetails',
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent, AcessorioListComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss',
})
export class CarrosdetailsComponent {
  @Input('carro') carro: Carro = new Carro(0, ''); //decorator @Input para receber o objeto carro do componente pai
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute); //injeção de dependência para acessar os parâmetros da rota
  router2 = inject(Router); //injeção de dependência para navegação(redirecionamento do botao)

  //ELEMENTOS DA MODAL
 modalService = inject(MdbModalService); //injetar para conseguir abrir a modal
  @ViewChild('modalMarcas') modalMarcas: any; //referencia para a modal no html
  @ViewChild('modalAcessorios') modalAcessorios: any; //referencia para a modal de acessórios no html
  modalRef!: MdbModalRef<any>; //variável para armazenar a referência da modal aberta, o tipo é MdbModalRef, que é a classe que representa a modal no mdb-angular-ui-kit


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

  buscarMarca(){
    this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'}); //abertura da modal de marcas, passando a referência da modal no html e a classe para deixar a modal maior
  }

  buscarAcessorio(){
    this.modalRef = this.modalService.open(this.modalAcessorios, {modalClass: 'modal-lg'}); 
  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca; //atribuição da marca selecionada na modal ao carro atual
         this.modalRef.close();
  }

  retornoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios == null){
      this.carro.acessorios = []; //inicializa a lista de acessórios do carro caso ela seja nula
    }
    this.carro.acessorios.push(acessorio); //adiciona o acessório selecionado na modal à lista de acessórios do carro atual
     this.modalRef.close();
  }

  desvincularAcessorio(acessorio: Acessorio){
      let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
      this.carro.acessorios.splice(posicao, 1); //remove o acessório da lista de acessórios do carro atual, utilizando a posição encontrada (1 unico elemento)
  }

}
