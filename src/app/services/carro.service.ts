import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/carro"; //variavel p ficar mais fácil de chamar a url

  constructor() { }

  findAll(): Observable<Carro[]>{
    //precisa do observable p fzr a requsiição assincrona, ou seja, o programa n vai esperar a resposta da requisição para continuar a execução do código
   return this.http.get<Carro[]>(this.API+"/findAll"); 
  }

  delete(id: number): Observable<string>{
  
   return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'}); //o responseType é necessário para indicar que a resposta da requisição é do tipo texto, e não json, pois o back retorna uma string de confirmação
   
  }

  save(carro: Carro): Observable<string>{
  
   return this.http.post<string>(this.API+"/save", carro, {responseType: 'text' as 'json'}); // o carro está aí pq é o body da requisição, ou seja, os dados que estão sendo enviados para o back para salvar ou atualizar um carro
  }

  update(carro: Carro, id: number): Observable<string>{
  
   return this.http.put<string>(this.API+"/update/"+id, carro, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Carro>{
  
   return this.http.get<Carro>(this.API+"/findById/"+id);
  }
}
