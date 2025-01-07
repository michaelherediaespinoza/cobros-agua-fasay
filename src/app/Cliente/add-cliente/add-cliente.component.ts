import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, RouterLink  } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../Entity/Cliente';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';  
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms'
import { CommonModule, DatePipe } from '@angular/common';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RespuestaApi } from '../../Entity/RespuestaApi';


@Component({
  selector: 'app-add-cliente',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatGridListModule, 
            MatInputModule, 
            MatButtonModule, 
            MatSelectModule, 
            FormsModule, 
            PageHeaderComponent,
            MatIconModule,
            RouterLink,
            MatDatepickerModule,
            CommonModule
          ],
  templateUrl: './add-cliente.component.html',
  styleUrl: './add-cliente.component.css'
})
export class AddClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  listClients: Cliente[];
  formattedDate: String;
  cedulaCliente: boolean;

  todayDate : Date = new Date();
  pipe: DatePipe;
  selectedDate: Date;
  
  codigoClie: any;
  updateOrSaveCliente : boolean = true; 
  //codigoCliente: number;
  errorMessage: string;

  seasons: string[] = ['MASCULINO', 'FEMENINO'];

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    //var now = Date.now();
    
   // this.formattedDate = formatDate(now, 'dd/MM/yyyy', 'es-EC');
    //const fechaDate = new Date(this.formattedDate);
    //const fechaDate = new Date(formattedDate);
    //console.log(now);
    
    //this.cliente.fechaIngreso = Date.now(); ;
    
    //console.log(localStorage.getItem('codigoCliente'));
    this.codigoClie = localStorage.getItem('codigoCliente');
    console.log("llegada:" , this.codigoClie );
    if (this.codigoClie != null ) {
      this.getClientePorCodigo(this.codigoClie);
      this.refetchForm();
      this.updateOrSaveCliente === false;
      localStorage.removeItem('codigoCliente');
      //localStorage.clear();
    }
  }

  // Método que "refresca" el formulario, utilizado para cuando quiero actualizar un cliente
  refetchForm() {
    setTimeout(() => {
      this.cdRef.detectChanges(); // Forzar detección de cambios
      console.log('actualizando data 001 ');
    }, 1000); // 1000 ms = 1 segundo
  }


  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log("fecha: " + this.selectedDate )
  }

  guardarOrUpdateCliente(): void {
    if(this.updateOrSaveCliente === true) {
      this.guardar();
    }else if (this.updateOrSaveCliente === false) { 
      this.updateCliente();
    }
  }

  /*

  guardar1(): void {
    console.log("Cliente nombre: " + this.cliente.nombre);
    //this.paciente.cargo = this.cargo;
    this.cliente.fechaIngreso = this.selectedDate;
    this.service.createCliente(this.cliente)
        .subscribe(() => {
        console.log(this.cliente);
        //console.log(response);
        this._snackBar.open('Cliente Guardado!', 'Exitosamente', { duration: 5000, verticalPosition: 'top' });
        //alert("Se Agrego con Exito...!!!");
        this.router.navigate(["list-cliente"]);
      },
      (error) => {
       this.errorMessage = error;
       this._snackBar.open('Error..!!', 'Validación ' + this.errorMessage, { duration: 5000, verticalPosition: 'top' });
     }
   );
  }
  
  */

  guardar(): void {
    if (
        !this.cliente.cedula || this.cliente.cedula.trim() === '' || 
        !this.cliente.nombre || this.cliente.nombre.trim() === '' || 
        !this.cliente.apellido || this.cliente.apellido.trim() === '' || 
        !this.cliente.direccion || this.cliente.direccion.trim() === '' || 
        !this.cliente.telefono || this.cliente.telefono === '' || 
        !this.cliente.sexo || this.cliente.sexo.trim() === ''
      )
    {
        console.log('La cédula es obligatoria.');
        this._snackBar.open('Por favor Ingrese los DATOS en TODOS los campos ', 'OK', { duration: 4000, verticalPosition: 'top'});
        //return;
    } else {
    console.log("Cliente nombre: " + this.cliente.nombre);
    //this.paciente.cargo = this.cargo;
    this.cliente.fechaIngreso = this.selectedDate;
      this.service.createCliente(this.cliente).subscribe(
        (response: RespuestaApi) => {
          console.log("respuesta: " + response.status);
          
          //this.respuestaApi = response;
          if (response.status === 1) {
            console.log('Success:', response.message);
            this._snackBar.open('Success: ' + response.message, 'OK', { duration: 4000, verticalPosition: 'top'});
            this.router.navigate(["list-cliente"]);
          } else {
            console.log('Error:', response.message);
            // Aquí puedes manejar el caso de error según lo que responda el servidor
            this._snackBar.open('Error: ' + response.message, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
          }
        },
        error => {
          console.error('Error al crear al cliente:', error.message);
          // Aquí puedes manejar cualquier error que ocurra durante la solicitud
          this._snackBar.open('Cliente con cédula: ' + this.cliente.cedula+ ' ya esta registrado.', 'Cerrar', { duration: 4000, verticalPosition: 'top'});
        }
      );
    }
  }




  getClientePorCodigo( codigoCli: number): void {
    this.service.getClientePorCodigo(codigoCli)
    .subscribe(data => {
      this.cliente = data;
      this.selectedDate = data.fechaIngreso;
      console.log('res', data);
    })
  }

  updateCliente(): void {
    this.cliente.fechaIngreso = this.selectedDate;
    this.service.updateCliente(this.cliente)
    .subscribe(data => {
      this.cliente = data;
      console.log('res', data);
    })
  }

  cacelar(): void {
    this.router.navigate(["list-cliente"]);
    //console.log("HOLA LLEGO ");
  }

  validaCedulita(): void {
    this.cedulaCliente = this.validarCedula(this.cliente.cedula + "");
    console.log("resul de cedula: " + this.cedulaCliente);
    if (this.cedulaCliente == true)
      this._snackBar.open('Cédula Ingresada', 'correctamente!', { duration: 3000 });
    else
      this._snackBar.open('Cédula', 'Incorrecta e Invalida!', { duration: 4000 });
  }


  //Metodo para validar solo letras!!
  onlyLetters(event: KeyboardEvent) {
    const charCode = event.charCode;
    const isLetter = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
    const isSpace = charCode === 32; // Código del espacio
  
    if (!isLetter && !isSpace) {
      event.preventDefault();  // Evitar que el carácter no válido se inserte
    }
  }

  validaCedulaCampo() {
    this.validaCedulita();
    // Validar si el campo cédula está vacío o contiene solo espacios en blanco
    if (!this.cliente.cedula || this.cliente.cedula.trim() === '') {
      console.log('La cédula es obligatoria.');
      // Mostrar mensaje al usuario
      this._snackBar.open('Por favor, complete el campo de CÉDULA', 'OK', { duration: 4000, verticalPosition: 'top' });
    }
  }






  



  validarCedula(cedula: string): boolean {

    if (cedula.length === 10) {

      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);

      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {

        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));

        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }

        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;

        // Suma total
        const sumaTotal = (pares + impares);

        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);

        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;

        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;

        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }

        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }

      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }

  }

}
