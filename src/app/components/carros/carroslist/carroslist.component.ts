import { Component, inject, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carroslist',
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss',
})
export class CarroslistComponent {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, '');

  carroService = inject(CarroService);

  modalService = inject(MdbModalService); //injetar para conseguir abrir a modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe: any; //referencia para a modal no html
  modalRef!: MdbModalRef<any>; //variável para armazenar a referência da modal aberta, o tipo é MdbModalRef, que é a classe que representa a modal no mdb-angular-ui-kit

  constructor() {
    this.findAll();

    let carroNovo = history.state.carroNovo; //acesso ao estado passado pela rota, caso exista um carroNovo, ele será adicionado à lista
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = this.lista.length + 1; //atribuição de um id para o novo carro, baseado no tamanho da lista
      this.lista.push(carroNovo);
    }
    if (carroEditado) {
      let indice = this.lista.findIndex((x) => {
        return x.id == carroEditado.id;
      });
      this.lista[indice] = carroEditado; //atualização do carro editado na lista, utilizando o indice encontrado
    }
  }

  findAll() {
    this.carroService.findAll().subscribe({
      next: (lista) => {
        //quando o back retornar o que se espera
        this.lista = lista; //atribuição da resposta da requisição à variável lista, que é utilizada para exibir os carros no html
      },
      error: (err) => {
        //quando ocorrer um erro (badrequest, exeception...)
        Swal.fire({
              title: "Ocorreu um erro",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
      },
    });
  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed && carro.id != null && carro.id > 0) { //esse carro.id != null && carro.id > 0 é para garantir que o id do carro seja válido antes de tentar deletar, evitando erros caso o id seja nulo ou inválido
        this.carroService.delete(carro.id).subscribe({
          next: (mensagem) => {
            //quando o back retornar o que se espera
            Swal.fire({
              title: mensagem, //e a mensagem q retorna la do back
              text: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAll(); //atualiza a lista la no front
          },
          error: (err) => {
            //quando ocorrer um erro (badrequest, exeception...)
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
    this.carroEdit = new Carro(null, ''); //limpaa o valor de carro para garantir que o formulário de detalhes seja aberto vazio, para cadastro de um novo carro
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    // this.carroEdit = carro; -- atribuição do carro a ser editado para a variável carroEdit, que será passada como input para o componente de detalhes, entretanto, dessa forma, as alterações feitas no formulário de detalhes seriam refletidas na lista imediatamente, mesmo antes de salvar, pois carroEdit e o objeto carro da lista apontariam para a mesma referência na memória. Para evitar isso, é necessário criar uma cópia do objeto carro para que as alterações feitas no formulário de detalhes não afetem a lista até que o usuário decida salvar as mudanças.

    this.carroEdit = Object.assign({}, carro); //criação de uma cópia do objeto carro para evitar que as alterações feitas no formulário de detalhes sejam refletidas na lista antes de salvar, garantindo que as mudanças só sejam aplicadas quando o usuário clicar em salvar

    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro) {

    this.findAll();
    this.modalRef.close(); //fechamento da modal após receber o retorno de um carro editado ou novo
  }
}
