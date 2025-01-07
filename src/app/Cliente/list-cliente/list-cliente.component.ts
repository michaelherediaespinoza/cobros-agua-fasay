import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../Entity/Cliente';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ServiceService } from '../../Service/service.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import {MatButtonModule} from '@angular/material/button';
import { RespuestaApi } from '../../Entity/RespuestaApi';

@Component({
  selector: 'app-list-cliente',
  standalone: true,
  imports: [MatTableModule,
            MatFormFieldModule, 
            MatPaginatorModule, 
            MatInputModule, 
            MatIconModule, 
            PageHeaderComponent,
            MatButtonModule,
            RouterLink],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.css'
})
export class ListClienteComponent implements OnInit, AfterViewInit {

  respuestaApi: RespuestaApi;
  errorMessage: string;
  clientes: Cliente[];
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['codigo', 'cedula', 'nombre', 'apellido', 'telefono', 'fechaIngreso', 'acciones'];

  @ViewChild("listpacientefocus") focusListClientes: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ServiceService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getAllClientes();
  }

  getAllClientes = () => {
    this.service.getClientes()
      .subscribe(data => {
        this.clientes = data;
        this.dataSource.data = this.clientes;
        console.log('res', data);
      },
       (error) => {
        this.errorMessage = error;
        this._snackBar.open('Error..!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
      }
    );
  }

  ngAfterViewInit() {
    this.focusListClientes.nativeElement.focus();
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

  Editar(cliente: Cliente): void {
    console.log("codigo cli: ", cliente.codigo.toString());
    localStorage.setItem('codigoCliente', cliente.codigo.toString());
    this.router.navigate(["add-cliente"]);
  }

  /*
  GetCodigoPaciente(cliente: Cliente): void {
    localStorage.setItem('codigo', cliente.codigo.toString());
    localStorage.setItem('nombre', cliente.nombre.toString());
    this.router.navigate(['add-consulta']);
  }
  */

  Delete(cliente: Cliente) {
    if (window.confirm('Esta seguro de Eliminar el Cliente ' + cliente.nombre + " " + cliente.apellido)) {
      this.service.deleteCliente(cliente.codigo).subscribe(
        
        (response: RespuestaApi) => {
          //this.respuestaApi = response;
          if (response.status === 1) {
            console.log('Success:', response.message);
            // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje o actualizar la UI
            this.clientes = this.clientes.filter(p => p !== cliente);
            this._snackBar.open('Success: ' + response.message, 'OK', { duration: 4000, verticalPosition: 'top'});
            this.getAllClientes();
          } else {
            console.log('Error:', response.message);
            // Aquí puedes manejar el caso de error según lo que responda el servidor
            this._snackBar.open('Error: ' + response.message, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
          }
        },
        error => {
          console.error('Error al eliminar el cliente:', error.message);
          // Aquí puedes manejar cualquier error que ocurra durante la solicitud
          this._snackBar.open('Cliente tiene transacciones realizadas no se puede ELIMINAR', 'Cerrar', { duration: 4000, verticalPosition: 'top'});
        }
      );
    }
  }

  addNewCliente(): void {
    //localStorage.clear();
    this.router.navigate(["add-cliente"]);
  }

  addNewMedidor(cliente: Cliente): void {
    //localStorage.clear();
    console.log("codigo cli: ", cliente.codigo.toString());
    localStorage.setItem('codiClienteParaMedidor', cliente.codigo.toString());
    localStorage.setItem('clienteParaMedidor', cliente.nombre.toString() + " " + cliente.apellido.toString());
    this.router.navigate(["add-medidor"]);
  }

  /*
  addNewCobro(cliente: Cliente): void {
    localStorage.clear();
    console.log("codigo cli: ", cliente.codigo.toString());
    localStorage.setItem('codiClienteParaCobro', cliente.codigo.toString());
    localStorage.setItem('clienteParaCobro', cliente.nombre.toString() + " " + cliente.apellido.toString());
    this.router.navigate(["add-cobro-admin"]);
  }
  */

}
