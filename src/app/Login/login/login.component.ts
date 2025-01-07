import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { AuthService } from '../../Service/auth.service';
import { ServiceService } from '../../Service/service.service';
import { Usuario } from '../../Entity/Usuario';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../layout/header/header.component';
import { SharedService } from '../../Service/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatProgressSpinnerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit  {

  sessionMessage: string | null = '';

  @ViewChild("inserUsuaer") inserUsuaer: ElementRef;

  //message: string = 'Hola desde el componente padre';

  form: FormGroup;
  loading: boolean = false;

  usuario: String;
  password: String;
  role: String;


  responseLogin: String;
  usuarios: Usuario[];

  usuarioAll: Usuario = new Usuario();

  routeRedirect = '';
  errorMessage: string;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, 
    private service: ServiceService, private _snackBar: MatSnackBar, private sharedService: SharedService) {

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    console.log("ENTRO EN NAvETACION");

    // Obtener el mensaje de sesión caducada
     this.sessionMessage = localStorage.getItem('sessionMessage');
     
     if (this.sessionMessage) {
      // Si sessionMessage tiene un valor, mostrar la alerta
      this.alertaUserInactividad(this.sessionMessage);
    } else {
      // Si no hay valor en sessionMessage, puedes manejarlo de alguna otra forma
      console.log('No hay mensaje de sesión en localStorage');
    }

    // Limpiar el mensaje después de mostrarlo
    localStorage.removeItem('sessionMessage');
  }

  /*

  loginUsuarioPrueba(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const usuario = formValue.usuario;
      const password = formValue.password;
      const role = formValue.role;

      // Lógica para manejar el inicio de sesión
      console.log('Usuario:', usuario);
      console.log('Password:', password);
      console.log('Rol:', role);

      // Puedes usar los valores de isAdmin y isCashier aquí
    }
  }

  login() {

    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;
    this.role = this.form.value.role;

    //this.authService.login('ADMIN');

    this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
    this.authService.urlUsuarioIntentaAcceder = '';
    console.log("URL.. " + this.routeRedirect);
    localStorage.setItem('usuariologin', this.usuario + "");
    if (this.routeRedirect === '') {
      this.router.navigate(["/home"])
    } else {
      this.errorUserPassword();
      this.form.reset();
      this.router.navigate([this.routeRedirect]);
    }
  }

  ingresar() {
    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;

    if (this.usuario == 'patito' && this.password == 'patito.123') {
      //rediccecionamos al dashboarf
      this.cargandooo();
      this.router.navigate(["dashboard"])

    } else {
      //mostramos un mensaje de error!
      this.errorUserPassword();
      this.form.reset();
    }
  }

  cargandooo() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

 */

  loginUsuario() {

    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;

    this.authService.login('ADMIN');
    this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
    this.authService.urlUsuarioIntentaAcceder = '';
    console.log("URL.. " + this.routeRedirect);

    this.service.getUsuarioByUsuario(this.usuario)
      .subscribe(data => {
        this.usuarioAll = data;
        console.log("Usuario: ", this.usuarioAll);
        console.log("valor nombre: ", this.usuarioAll.nombre);

        if(this.usuarioAll !== null && this.usuarioAll.password == this.password) {
        //console.log("valor: ", this.usuarios[1].nombre);
          //rediccecionamos al dashboarf
          localStorage.setItem('usuariologin', this.usuario + "");
          this._snackBar.open('Usuario Ingresado', 'Exitosamente!', { duration: 3000 });
          //this.cargandooo();
          //this.login();

        }else {
          this._snackBar.open('Usuario o contraseña inválidos', 'Ingrese nuevamente', {
            duration: 6000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }); 
          //this.error2();
        }
      })
  }

 
  


  
  /*

  BIEND DES AQUI


 loginFinal() {

    this.getUsuarioByUser();
    console.log("ROLE:" + this.role);
    console.log('Usuario:', this.usuario);
    console.log('Password:', this.password);
    console.log('Rol:', this.role);
    
    if(this.usuarioAll !== null && this.usuarioAll.password == this.password && this.role == "Administrador" ) {
      console.log("ingreso como adinistrador");
      
        localStorage.setItem('usuariologin', this.usuario + "");
         
         //Linea CLAVE 
        this.authService.login('ADMIN');

        this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
         //this.authService.urlUsuarioIntentaAcceder = '';
        console.log("URL.. " + this.routeRedirect);

        if (this.routeRedirect === '') {
          this.router.navigate(["/home"])
          this._snackBar.open('Usuario Ingresado', 'Exitosamente!', { duration: 3000 });
        } else {
          //this.error2();
          this.form.reset();
          this.router.navigate([this.routeRedirect]);
        }
          
       // this.login();

    }else if (this.usuarioAll !== null && this.usuarioAll.password == this.password && this.role == "Cajero" ) {
      console.log("ingreso como cajero");
      localStorage.setItem('usuariologin', this.usuario + "");
         
        //Linea CLAVE 
      this.authService.login('CAJERO');

      this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
        //this.authService.urlUsuarioIntentaAcceder = '';
        console.log("URL.. " + this.routeRedirect);

      if (this.routeRedirect === '') {
         this.router.navigate(["/home"])
         this._snackBar.open('Usuario Ingresado', 'Exitosamente!', { duration: 3000 });
         } else {
         //this.errorUserPassword();
         this.form.reset();
         this.router.navigate([this.routeRedirect]);
      }
    } 
    //this.alertaUserPassword();
  } 

  */

  getUsuarioByUser(): void { 

    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;
    this.role = this.form.value.role;

    this.service.getUsuarioByUsuario(this.usuario)
    .subscribe(data => {
    this.usuarioAll = data;
    console.log("Usuario: ", this.usuarioAll.nombre);
    console.log("BOX_Rol: ", this.role);
    console.log("Get_Rol: ", this.usuarioAll.rol.nombre);
    console.log("valor nombre: ", this.usuarioAll.nombre);
    console.log("Role_1: ", this.role);
    if (this.usuarioAll.password !== this.password) {
      this.authService.logout();
      this.alertaUserPassword();
    }else  if(this.usuarioAll.rol.nombre !== this.role ) {
      this.authService.logout();
      this.alertaErrorUserRol();
      return;
    }


    if(this.usuarioAll !== null && this.usuarioAll.password == this.password && this.role == "Administrador" ) {
        console.log("ingreso como adinistrador");
        
          localStorage.setItem('usuariologin', this.usuarioAll.codigo + "");
           
           //Linea CLAVE 
          this.authService.login('ADMIN');
          this.sharedService.updateUser(this.usuarioAll);
          this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
           //this.authService.urlUsuarioIntentaAcceder = '';
          //console.log("URL.. " + this.routeRedirect);
  
          if (this.routeRedirect === '') {
            this.router.navigate(["/home"])
            this._snackBar.open('Usuario Ingresado', 'Exitosamente!', { duration: 3000 });
          } else {
            //this.error2();
            this.form.reset();
            this.router.navigate([this.routeRedirect]);
          }
            
         // this.login();
  
    }else if (this.usuarioAll !== null && this.usuarioAll.password == this.password && this.role == "Cajero" ) {
        console.log("ingreso como cajero");
        localStorage.setItem('usuariologin', this.usuarioAll.codigo + "");
           
          //Linea CLAVE 
        this.authService.login('CAJERO');
        this.sharedService.updateUser(this.usuarioAll);
        this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
          //this.authService.urlUsuarioIntentaAcceder = '';
        //console.log("URL.. " + this.routeRedirect);
  
        if (this.routeRedirect === '') {
           this.router.navigate(["/home"])
           this._snackBar.open('Usuario Ingresado', 'Exitosamente!', { duration: 3000 });
           } else {
           //this.errorUserPassword();
           this.form.reset();
           this.router.navigate([this.routeRedirect]);
        }
      } 

    },
    (error) => {
    this.errorMessage = error;
    this._snackBar.open('Error!!', this.errorMessage, { duration: 8000, verticalPosition: 'top' });
    this.alertaUserPassword();
    this.authService.logout();
    });
  }

  mostrarPassword(): void {
    this.showPassword = !this.showPassword;
    const passwordField: any = document.getElementById('txtPassword');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

  errorUserPassword() {
    this._snackBar.open('Usuario o contraseña inválidos', 'Ingrese nuevamente', {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  alertaUserPassword(): void {
    Swal.fire({
      position: "center",
      text: "USUARIO",
      title: "Usuario o contraseña inválidos, Ingrese nuevamente",
      icon: "warning",
      showConfirmButton: false,
      timer: 1800
    });
  }

  alertaErrorUserRol(): void {
    Swal.fire({
      position: "center",
      text: "USUARIO",
      title: "Rol NO corresponde al Usuario: " + this.usuarioAll.user,
      icon: "warning",
      showConfirmButton: false,
      timer: 2100
    });
  }

  alertaUserInactividad(message: String): void {
    Swal.fire({
      position: "center",
      text: "USUARIO",
      title: message,
      icon: "warning",
      showConfirmButton: true,  // Mostrar botón de confirmación
      confirmButtonText: "OK",  // Texto del botón
      allowOutsideClick: false  // Evitar que se cierre al hacer clic fuera de la alerta
    });
  }
  

  userIncorrectoFocus() {
    this.inserUsuaer.nativeElement.focus();
  }


}