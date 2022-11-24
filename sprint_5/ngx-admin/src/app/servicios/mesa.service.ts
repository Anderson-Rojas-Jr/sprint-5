import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mesa} from '../modelos/mesa.model';
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Mesa[]> {
      return this.http.get<Mesa[]>(`${environment.url_gateway}/mesas`);    
  }
  eliminar(id:string){
    return this.http.delete<Mesa>(`${environment.url_gateway}/mesas/${id}`,);
  }
  getMesa(id: string): Observable<Mesa> {
    return this.http.get<Mesa>(`${environment.url_gateway}/mesas/${id}`);
  }
  crear(elMesa: Mesa) {
    return this.http.post(`${environment.url_gateway}/mesas`, elMesa);
  }
  editar(id:string,elMesa: Mesa) {
    return this.http.put(`${environment.url_gateway}/mesas/${id}`, elMesa);
  }

}