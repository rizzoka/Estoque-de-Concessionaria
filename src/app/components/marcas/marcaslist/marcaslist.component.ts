import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marcaslist',
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0, '');

  @Input("esconderBotoes") esconderBotoes: boolean = false; //decorator @Input para receber do componente pai a informação de esconder ou mostrar os botões de editar e deletar, por padrão é false, ou seja, os botões são mostrados
  @Output('retorno') retorno = new EventEmitter<any>(); //decorator @Output para emitir o retorno de uma marca editada ou nova

  marcaService = inject(MarcaService);

  modalService = inject(MdbModalService); //injetar para conseguir abrir a modal
  @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe: any; //referencia para a modal no html
  modalRef!: MdbModalRef<any>; //variável para armazenar a referência da modal aberta, o tipo é MdbModalRef, que é a classe que representa a modal no mdb-angular-ui-kit

  constructor() {
    this.findAll();

    let marcaNova = history.state.marcaNova; //acesso ao estado passado pela rota, caso exista uma marcaNova, ela será adicionado à lista
    let marcaEditada = history.state.marcaEditada;

    if (marcaNova) {
      marcaNova.id = this.lista.length + 1; //atribuição de um id para a nova marca, baseado no tamanho da lista
      this.lista.push(marcaNova);
    }
    if (marcaEditada) {
      let indice = this.lista.findIndex((x) => {
        return x.id == marcaEditada.id;
      });
      this.lista[indice] = marcaEditada; //atualização da marca editada na lista, utilizando o indice encontrado
    }
  }

  findAll() {
    this.marcaService.findAll().subscribe({
      next: (lista) => {
        //quando o back retornar o que se espera
        this.lista = lista; //atribuição da resposta da requisição à variável lista, que é utilizada para exibir as marcas no html
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

  deleteById(marca: Marca) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed && marca.id != null && marca.id > 0) { //esse carro.id != null && carro.id > 0 é para garantir que o id do carro seja válido antes de tentar deletar, evitando erros caso o id seja nulo ou inválido
        this.marcaService.delete(marca.id).subscribe({
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
    this.marcaEdit = new Marca(null, ''); //limpaa o valor de carro para garantir que o formulário de detalhes seja aberto vazio, para cadastro de um novo carro
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca) {
    // this.marcaEdit = marca; -- atribuição da marca a ser editada para a variável marcaEdit, que será passada como input para o componente de detalhes, entretanto, dessa forma, as alterações feitas no formulário de detalhes seriam refletidas na lista imediatamente, mesmo antes de salvar, pois marcaEdit e o objeto marca da lista apontariam para a mesma referência na memória. Para evitar isso, é necessário criar uma cópia do objeto marca para que as alterações feitas no formulário de detalhes não afetem a lista até que o usuário decida salvar as mudanças.

    this.marcaEdit = Object.assign({}, marca); //criação de uma cópia do objeto marca para evitar que as alterações feitas no formulário de detalhes sejam refletidas na lista antes de salvar, garantindo que as mudanças só sejam aplicadas quando o usuário clicar em salvar

    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {

    this.findAll();
    this.modalRef.close(); //fechamento da modal após receber o retorno de uma marca editada ou nova
  }

  select(marca: Marca){
    this.retorno.emit(marca); //emite a marca selecionada para o componente pai, que pode ser utilizado para preencher o campo de marca no formulário de detalhes de carro, por exemplo
  }

}
