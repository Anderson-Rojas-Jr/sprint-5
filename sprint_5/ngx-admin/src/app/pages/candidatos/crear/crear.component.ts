import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatosService } from '../../../servicios/candidato.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_candidato: string = "";
  intentoEnvio: boolean = false;
  elCandidato: Candidato = {
    cedula: "",
    nombre: "",
    apellido: "",
    numero_resolucion:""
    
  }
  constructor(private miServicioCandidatos: CandidatosService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_candidato) {
      this.modoCreacion = false;
      this.id_candidato = this.rutaActiva.snapshot.params.id_candidato;
      this.getCandidato(this.id_candidato)
    } else {
      this.modoCreacion = true;
    }
  }
  getCandidato(id: string) {
    this.miServicioCandidatos.getCandidato(id).
      subscribe(data => {
        this.elCandidato = data;
      });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioCandidatos.crear(this.elCandidato).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El candidato ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/candidatos/listar"]);
        });
    }

  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioCandidatos.editar(this.elCandidato._id, this.elCandidato).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El candidato ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/candidatos/listar"]);
        });
    }

  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elCandidato.cedula=="" || 
       this.elCandidato.nombre=="" || 
       this.elCandidato.apellido==""||
       this.elCandidato.numero_resolucion==""){
        
      return false;
    }else{
      return true;
    }
  }
}