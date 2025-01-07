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
import { Medidor } from '../../Entity/Medidor';
import { RespuestaApi } from '../../Entity/RespuestaApi';

@Component({
  selector: 'app-list-medidor',
  standalone: true,
  imports: [MatTableModule,
    MatFormFieldModule, 
    MatPaginatorModule, 
    MatInputModule, 
    MatIconModule, 
    PageHeaderComponent,
    MatButtonModule,
    RouterLink],
  templateUrl: './list-medidor.component.html',
  styleUrl: './list-medidor.component.css'
})
export class ListMedidorComponent implements OnInit, AfterViewInit {

  errorMessage: string;
  respuesta: RespuestaApi;
  clientes: Cliente[];
  medidores: Medidor[];
  dataSource = new MatTableDataSource<Medidor>();
  displayedColumns: string[] = ['codigo', 'numero', 'tipo', 'estatus', 'fechaIngreso', 'cliente', 'acciones'];

  @ViewChild("listpacientefocus") focusListClientes: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllMedidores();
  }

  getAllMedidores = () => {
    this.service.getMedidores()
      .subscribe(data => {
        this.medidores = data;
        this.dataSource.data = this.medidores;
        //console.log('med_res: ', data);
        console.log('medidores: ', this.medidores)
      },
      (error) => {
      this.errorMessage = error;
      this._snackBar.open('Error!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
    });
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

  Editar(medidor: Medidor): void {
    console.log("codigo Med: ", medidor.codigo.toString());
    localStorage.setItem('codigoMedidor', medidor.codigo.toString());
    //localStorage.setItem('nombreApellidoCliente', medidor.cliente.nombre.toString() + " " + medidor.cliente.apellido.toString());
    this.router.navigate(["add-medidor"]);
  }


  Delete(medidor: Medidor) {
    if (window.confirm('Esta seguro de Eliminar el Medidor ' + medidor.numero + " Estatus " + medidor.estatus)) {
      this.service.deleteMedidor(medidor.codigo).subscribe(
        
        (response: RespuestaApi) => {
          //this.respuestaApi = response;
          if (response.status === 1) {
            console.log('Success:', response.message);
            // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje o actualizar la UI
            this.medidores = this.medidores.filter(p => p !== medidor);
            this._snackBar.open('Success: ' + response.message, 'OK', { duration: 4000, verticalPosition: 'top'});
            this.getAllMedidores();
          } else {
            console.log('Error:', response.message);
            // Aquí puedes manejar el caso de error según lo que responda el servidor
            this._snackBar.open('Error: ' + response.message, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
          }
        },
        error => {
          console.error('Error al eliminar el medidor:', error.message);
          // Aquí puedes manejar cualquier error que ocurra durante la solicitud
          this._snackBar.open('Medidor tiene transacciones realizadas no se puede ELIMINAR', 'Cerrar', { duration: 4000, verticalPosition: 'top'});
        }
      );
    }
  }







  addNewMedidor(): void {
    //localStorage.clear();
    this.router.navigate(["list-cliente"]);
  }

  addNewCobro(medidor: Medidor): void {
    //localStorage.clear();
    console.log("codigo medidor: ", medidor.codigo.toString());
    localStorage.setItem('codigoMedidorParaCobro', medidor.codigo.toString());
    localStorage.setItem('clienteParaCobro', medidor.cliente.nombre + " " + medidor.cliente.apellido);
    this.router.navigate(["add-cobro-admin"]);
  }



}
