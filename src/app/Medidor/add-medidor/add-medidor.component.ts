import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, RouterLink  } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Cliente } from '../../Entity/Cliente';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';  
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms'
import { formatDate } from '@angular/common';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import {MatIconModule} from '@angular/material/icon';
import { Medidor } from '../../Entity/Medidor';
import { RespuestaApi } from '../../Entity/RespuestaApi';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-medidor',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatGridListModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    FormsModule, 
    PageHeaderComponent,
    MatDatepickerModule,
    MatIconModule,
    RouterLink],
  templateUrl: './add-medidor.component.html',
  styleUrl: './add-medidor.component.css'
})
export class AddMedidorComponent implements OnInit{

  medidor: Medidor = new Medidor();
  cliente: Cliente = new Cliente();
  //listClients: Cliente[];
  formattedDate: any;
  respuesta: RespuestaApi;

  codigoClieParaMedidor: any;
  codigoMedidorUpdate: any;
  nombreApellidoCliente: any = "";
  updateOrSaveMedidor : boolean = true; 
  selectedDate: Date;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.formattedDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.medidor.fechaIngreso = this.formattedDate;
    
    //console.log(localStorage.getItem('codigoCliente'));
    this.codigoMedidorUpdate = localStorage.getItem('codigoMedidor');
    this.nombreApellidoCliente = localStorage.getItem('clienteParaMedidor');
    this.codigoClieParaMedidor = localStorage.getItem('codiClienteParaMedidor');
    console.log("llegada:" , this.codigoClieParaMedidor);
    //this.getClientePorCodigo(this.codigoClieParaMedidor);
    //Optenemos el codigo del cliente para ponder guardar el medidor que pertenece a ese cliente.
    console.log("Codigo Medidor para Update: " + this.codigoMedidorUpdate);

    if (this.codigoMedidorUpdate != null ) {
      this.nombreApellidoCliente = '';
      this.getMedidorPorCodigo(this.codigoMedidorUpdate);
      console.log("Codigo Medidor para Update 2: " + this.medidor.codigo);
      this.refetchForm();
      this.updateOrSaveMedidor == false;
      localStorage.removeItem('codigoMedidor');
      //this.nombreApellidoCliente = localStorage.getItem('nombreApellidoCliente');
    } else {
      this.getClientePorCodigo(this.codigoClieParaMedidor);
    }
  }

    // Método que "refresca" el formulario, utilizado para cuando quiero actualizar un cliente
    refetchForm() {
      setTimeout(() => {
        this.cdRef.detectChanges(); // Forzar detección de cambios
        console.log('actualizando data 001 ');
      }, 1000); // 1000 ms = 1 segundo
    }

  guardarOrUpdateMedidor(): void {
    if(this.updateOrSaveMedidor == true) {
      console.log("Gaurdooooo")
      this.guardar();
    }else if (this.updateOrSaveMedidor == false) { 
      this.updateMedidor();
    }
    
  }

  guardar(): void {
    if (
      !this.medidor.numero || this.medidor.numero === '' || 
      !this.medidor.tipo || this.medidor.tipo.trim() === '' || 
      !this.medidor.estatus || this.medidor.estatus.trim() === ''
    )
    {
      console.log('La cédula es obligatoria.');
      this._snackBar.open('Por favor Ingrese los DATOS en TODOS los campos ', 'OK', { duration: 4000, verticalPosition: 'top'});
      //return;
    }   else {


    console.log("Cliente nombre: " + this.cliente.codigo);
    //this.paciente.cargo = this.cargo;
    this.medidor.cliente = this.cliente;
    this.medidor.fechaIngreso = this.selectedDate;
    this.service.createMedidor(this.medidor)
        .subscribe(response => {
        //console.log(this.medidor);
        this.respuesta = response;
        console.log('Respuesta del servidor:', response);
        this._snackBar.open(this.respuesta.message, 'Exitosamente', { duration: 4000, verticalPosition: 'top' });
        //alert("Se Agrego con Exito...!!!");
        this.router.navigate(["list-medidor"]);
      })
    }
  }

  getMedidorPorCodigo( codigoMed: number): void {
    this.service.getMedidorPorCodigo(codigoMed)
    .subscribe(data => {
      console.log('data Mediii: ' + data.numero);
      this.cliente = data.cliente;
      this.selectedDate = data.fechaIngreso;
      this.medidor = data;
      this.nombreApellidoCliente = this.medidor.cliente.nombre + " " + this.medidor.cliente.apellido;
      console.log('res', data);
    })
  }

  
  getClientePorCodigo( codigoCli: number): void {
    this.service.getClientePorCodigo(codigoCli)
    .subscribe(data => {
      this.cliente = data;
      console.log('Cliente: ', data.nombre);
    })
  }


  updateMedidor(): void {
    this.medidor.cliente = this.cliente;
    this.service.updateMedidor(this.medidor)
    .subscribe(data => {
      this.medidor = data;
      console.log('res', data);
    })
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log("fecha: " + this.selectedDate)
  }

  cacelar(): void {
    this.router.navigate(["list-medidor"]);
    //console.log("HOLA LLEGO ");
  }
}
