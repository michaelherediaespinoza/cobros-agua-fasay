import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, RouterLink  } from '@angular/router';
import { ServiceService } from '../../../Service/service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';  
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms'
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import {MatIconModule} from '@angular/material/icon';
import { Cobro } from '../../../Entity/Cobro';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { Medidor } from '../../../Entity/Medidor';
import { RespuestaApi } from '../../../Entity/RespuestaApi';
import { Cliente } from '../../../Entity/Cliente';

@Component({
  selector: 'app-add-cobro-admin',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatGridListModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    FormsModule, 
    PageHeaderComponent,
    MatIconModule,
    RouterLink, MatFormFieldModule, MatDatepickerModule, MatCardModule],
  templateUrl: './add-cobro-admin.component.html',
  styleUrl: './add-cobro-admin.component.css'
})
export class AddCobroAdminComponent implements OnInit{

  codigoMediParaCobro: any;
  nombreApellidoCliente: any = "";
  codigoCobroParaUpdate: any = "";
  errorMessage: string = '';

  //cliente: Cliente = new Cliente();
  medidor: Medidor = new Medidor();
  cobro: Cobro = new Cobro();
  cliente: Cliente = new Cliente();
  respuestaApi: RespuestaApi;
  updateOrSaveCobro : boolean = true; 
  //selected: Date | null;

  valorTotalCobrar: number = 0;

  selectedDate: Date;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.nombreApellidoCliente = '';
    this.codigoCobroParaUpdate = localStorage.getItem('codigoCobro');
    this.nombreApellidoCliente = localStorage.getItem('clienteParaCobro');
    this.codigoMediParaCobro = localStorage.getItem('codigoMedidorParaCobro');
    //this.getMedidorPorCodigo(this.codigoMediParaCobro);
    this.iniciarValor();

    if(this.codigoCobroParaUpdate != null ) {
      console.log("nombres 001: " + this.nombreApellidoCliente );
      
      localStorage.removeItem('clienteParaCobro')
      this.nombreApellidoCliente = '';
      this.getCobroPorCodigo(this.codigoCobroParaUpdate);
      //this.nombreApellidoCliente = this.cliente.nombre + " " + this.cliente.apellido;
      console.log("nombres 002: " + this.nombreApellidoCliente );
      //this.selectedDate = this.cobro.cob_fecha;
      this.refetchForm();
      this.updateOrSaveCobro == false;
      localStorage.removeItem('codigoCobro');
    } else {
      this.getMedidorPorCodigo(this.codigoMediParaCobro);
      localStorage.removeItem('codigoMedidorParaCobro');
    }    
  }

  iniciarValor(): void {
    this.cobro.cob_valorActual = 0;
    this.cobro.cob_mul_trabajo = 0;
    this.cobro.cob_mul_reunion = 0;
    this.cobro.cob_mul_desfile = 0;
    this.cobro.cob_cambioMedidor = 0;
    this.cobro.cob_nuevoSocio = 0;
    this.cobro.cob_insumo = 0;
    this.cobro.cob_otros = 0;

    this.cobro.cob_estado = 'P';
  }

  cancelar(): void {
    //console.log(this.selected);
    this.router.navigate(['list-medidor']);
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log("fecha: " + this.selectedDate )
  }

    // Método que "refresca" el formulario, utilizado para cuando quiero actualizar un cliente
  refetchForm() {
    setTimeout(() => {
      this.cdRef.detectChanges(); // Forzar detección de cambios
      console.log('actualizando data 001 ');
    }, 1000); // 1000 ms = 1 segundo
  }

  guardarOrUpdateCobro(): void {
    if(this.updateOrSaveCobro === true) {
      this.guardar();
    }else if (this.updateOrSaveCobro === false) { 
      this.updateCobroAll();
    }
  }

  guardar(): void {
    this.cobro.cob_fecha = this.selectedDate;
    this.cobro.medidor = this.medidor;

    console.log("data GET: " + this.cobro.cob_fecha);
    console.log("Valor total: " + this.cobro.cob_total);
  
    if (!this.cobro.cob_fecha) {
      this._snackBar.open('Debe Ingresar una Fecha', 'OK', { duration: 4000, verticalPosition: 'top' });
      return;
    } else if (!this.cobro.cob_total) {
      this._snackBar.open('Cobro Total debe tener al menos un VALOR', 'OK', { duration: 4000, verticalPosition: 'top' });
      return;
    } else {
    //console.log("Cliente nombre: " + this.cliente.nombre);
        //this.cobro.medidor = this.medidor;
        //this.cobro.cob_fecha = this.selectedDate;
        this.service.createCobro(this.cobro)
          .subscribe(() => {
          console.log(this.cobro);
          //console.log(response);
          this._snackBar.open('Registro de Cobro Guardado!', 'Exitosamente', { duration: 4000, verticalPosition: 'top' });
          //alert("Se Agrego con Exito...!!!");
          //this.router.navigate(["list-cobro-admin"]);
          this.router.navigate(["list-cobro-admin"]);
        },
        (error) =>
        {
          this.errorMessage = error;
          this._snackBar.open('Error!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
        });
    }
  }

  updateCobroAll (): void {
    console.log("fecha: " + this.selectedDate);
    
    this.cobro.cob_fecha = this.selectedDate;
    this.cobro.medidor = this.medidor;

    this.service.updateCobroAll(this.cobro)
    .subscribe(data => {
      this.respuestaApi = data

      if(this.respuestaApi.status === 1 ) {
        this._snackBar.open('Success: ' + this.respuestaApi.message, 'OK', { duration: 4000, verticalPosition: 'top'});
        this.router.navigate(["list-cliente"]);
      } else {
        // Aquí puedes manejar el caso de error según lo que responda el servidor
        this._snackBar.open('Error: ' + this.respuestaApi.message, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
      }
    },
    error => {
      console.error('Error al crear al cliente:', error.message);
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      this._snackBar.open('Error: ' + error.message , ' Cerrar', { duration: 4000, verticalPosition: 'top'});
    }
    )
  }

  getMedidorPorCodigo( codigoMed: number): void {
    this.service.getMedidorPorCodigo(codigoMed)
    .subscribe(data => {
      this.medidor = data;
      console.log('Cliente: ', data.numero);
    })
  }

  getCobroPorCodigo( codigoCob: number): void {
    this.service.getCobroPorCodigo(codigoCob)
    .subscribe(data => {
      this.cobro = data;
      this.medidor = data.medidor;
      this.cliente = data.medidor.cliente;
      this.nombreApellidoCliente = this.cliente.nombre + ' ' + this.cliente.apellido;
      this.selectedDate = data.cob_fecha;
    })
  }

  calcularValorTotal(event: Event): void {
    console.log('Input clicked!', event);
    this.valorTotalCobrar = this.cobro.cob_valorActual + this.cobro.cob_mul_trabajo + this.cobro.cob_mul_reunion +
                            this.cobro.cob_mul_desfile + this.cobro.cob_cambioMedidor + this.cobro.cob_nuevoSocio +
                            this.cobro.cob_insumo + this.cobro.cob_otros;
                            this.cobro.cob_total = this.valorTotalCobrar;
  }

  onTabPress(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      console.log('Tab key pressed!', event);
      this.calcularValorTotal(event);
      // event.preventDefault(); // Descomenta esto si quieres prevenir el comportamiento predeterminado de Tab
    }
  }

  calcularValorTotalFoco(): void {
    //console.log('Input clicked!', event);
    this.valorTotalCobrar = this.cobro.cob_valorActual + this.cobro.cob_mul_trabajo + this.cobro.cob_mul_reunion +
                            this.cobro.cob_mul_desfile + this.cobro.cob_cambioMedidor + this.cobro.cob_nuevoSocio +
                            this.cobro.cob_insumo + this.cobro.cob_otros;
                            this.cobro.cob_total = this.valorTotalCobrar;
  }

}
