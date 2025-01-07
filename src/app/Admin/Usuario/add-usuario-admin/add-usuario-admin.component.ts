import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Usuario } from '../../../Entity/Usuario';
import { ServiceService } from '../../../Service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RespuestaApi } from '../../../Entity/RespuestaApi';
import { Rol } from '../../../Entity/Rol';
import { cargo } from '../../../Entity/Cargo';
import { Agencia } from '../../../Entity/Agencia';

@Component({
  selector: 'app-add-usuario-admin',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatGridListModule,
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
  templateUrl: './add-usuario-admin.component.html',
  styleUrl: './add-usuario-admin.component.css'
})
export class AddUsuarioAdminComponent implements  OnInit {

  usuario: Usuario = new Usuario();
  rol: Rol = new Rol();
  agencia: Agencia = new Agencia();
  cargo: cargo = new cargo();
  selectedDate: Date;
  updateOrSaveUsuiario : boolean = true; 

  roles: Rol[] = []; // Lista de roles
  cargos: cargo[] = []; // Lista de cargos
  agencias: Agencia[] = []; // Lista de agencias

  codigoUser: any;
  errorMessage: string;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarAgencias();
    this.cargarCargos();

    this.codigoUser = localStorage.getItem('codigoUsuario');
    console.log("llegada:" , this.codigoUser );
    if (this.codigoUser != null ) {
      this.getUsuarioPorCodigo(this.codigoUser);
      this.refetchForm();
      this.updateOrSaveUsuiario === false;
      localStorage.removeItem('codigoUsuario');
      //localStorage.clear();
    }
  }

  getUsuarioPorCodigo( codigoUser: number): void {
    this.service.getUsuarioById(codigoUser)
    .subscribe(data => {
      this.usuario = data;
      this.selectedDate = data.fechaCreacion;
      this.rol = data.rol;
      this.agencia = data.agencia;
      this.cargo = data.cargo;
      console.log('Response: ', data);
    })
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

    guardarOrUpdateUsuario(): void {
      if(this.updateOrSaveUsuiario === true) {
        this.guardar(); 
      }else if (this.updateOrSaveUsuiario === false) { 
        this.update();
      }
    }

    guardar(): void {
      if (
          !this.usuario.nombre || this.usuario.nombre.trim() === '' || 
          !this.usuario.apellido || this.usuario.apellido.trim() === '' || 
          !this.usuario.user || this.usuario.user.trim() === '' || 
          !this.usuario.password || this.usuario.password === '' || 
          !this.usuario.estado || this.usuario.estado.trim() === ''
        )
      {
          this._snackBar.open('Por favor Ingrese los DATOS en TODOS los campos ', 'OK', { duration: 4000, verticalPosition: 'top'});
          //return;
      } else {
      //this.paciente.cargo = this.cargo;
      this.usuario.fechaCreacion = this.selectedDate;
        this.service.createUsuario(this.usuario).subscribe(
          (response: RespuestaApi) => {
            console.log("respuesta: " + response.status);
            
            //this.respuestaApi = response;
            if (response.status === 1) {
              console.log('Success:', response.message);
              this._snackBar.open('Success: ' + response.message, 'OK', { duration: 4000, verticalPosition: 'top'});
              this.router.navigate(["list-usuario-admin"]);
            } else {
              console.log('Error:', response.message);
              // Aquí puedes manejar el caso de error según lo que responda el servidor
              this._snackBar.open('Error: ' + response.message, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
            }
          },
          error => {
            this._snackBar.open('Error al crear el Usuario.', 'Cerrar', { duration: 4000, verticalPosition: 'top'});
          }
        );
      }
    }

    update(): void {
      this.usuario.fechaCreacion = this.selectedDate;
      this.service.updateUsuario(this.usuario)
      .subscribe(data => {
        this.usuario = data;
        console.log('res', data);
      })
    }

    cargarRoles(): void {
      this.service.getRoles()
      .subscribe(
        (data: Rol[]) => {
        this.roles = data;
      });
    }

    cargarAgencias(): void {
      this.service.getAgencias()
      .subscribe(
        (data: Agencia[]) => {
        this.agencias = data;
      });
    }

    cargarCargos(): void {
      this.service.getCargos()
      .subscribe(
        (data: cargo[]) => {
        this.cargos = data;
      });
    }
  
    guardarUsuario(): void {
      // Aquí puedes enviar la información del usuario al backend
      console.log(this.usuario);
    }

  cacelar(): void {
    this.router.navigate(["list-usuario-admin"]);
  }

}
