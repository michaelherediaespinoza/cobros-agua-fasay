import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../Entity/Usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RespuestaApi } from '../../../Entity/RespuestaApi';
import { ServiceService } from '../../../Service/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { PageHeaderComponent } from "../../../layout/page-header/page-header.component";

@Component({
  selector: 'app-list-usuario-admin',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    PageHeaderComponent
],
  templateUrl: './list-usuario-admin.component.html',
  styleUrl: './list-usuario-admin.component.css'
})
export class ListUsuarioAdminComponent implements OnInit{

  respuestaApi: RespuestaApi;
  errorMessage: string;
  usuarios: Usuario[]  = [];
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'usuario', 'password', 'estado', 'creacion', 'rol', 'agencia', 'acciones'];

  @ViewChild("listusuariofocus") focusListUsuarios: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ServiceService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getAllUsuarios();
  }

  getAllUsuarios = () => {
    this.service.getUsuarios()
      .subscribe(data => {
        this.usuarios = data;
        this.dataSource.data = this.usuarios;
        console.log('res', data);
      },
       (error) => {
        this.errorMessage = error;
        this._snackBar.open('Error..!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
      }
    );
  }

  ngAfterViewInit() {
    this.focusListUsuarios.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  Editar(usuario: Usuario): void {
    //console.log("codigo cli: ", usuario.codigo.toString());
    localStorage.setItem('codigoUsuario', usuario.codigo.toString());
    this.router.navigate(["add-usuario-admin"]);
  }


  addNewUsuario(): void {
    this.router.navigate(["add-usuario-admin"]);
  }

}
