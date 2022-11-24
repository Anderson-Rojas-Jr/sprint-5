import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesa } from '../../../modelos/mesa.model';
import { MesasService } from '../../../servicios/mesa.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_mesa: string = "";
  intentoEnvio: boolean = false;
  elMesa: Mesa = {
    numero: "",
    cantidad_inscritos:""
    
  }
  constructor(private miServicioMesas: MesasService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_mesa) {
      this.modoCreacion = false;
      this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
      this.getMesa(this.id_mesa)
    } else {
      this.modoCreacion = true;
    }
  }
  getMesa(id: string) {
    this.miServicioMesas.getMesa(id).
      subscribe(data => {
        this.elMesa= data;
      });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioMesas.crear(this.elMesa).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'L mesa ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/mesas/listar"]);
        });
    }

  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioMesas.editar(this.elMesa._id, this.elMesa).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'La mesa ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/mesas/listar"]);
        });
    }

  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elMesa.numero=="" || 
       this.elMesa.cantidad_inscritos==""){
        
      return false;
    }else{
      return true;
    }
  }
}