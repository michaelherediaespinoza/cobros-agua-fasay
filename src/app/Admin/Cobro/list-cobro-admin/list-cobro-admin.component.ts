import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../../Entity/Cliente';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ServiceService } from '../../../Service/service.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import {MatButtonModule} from '@angular/material/button';
import { Cobro } from '../../../Entity/Cobro';
import { RespuestaApi } from '../../../Entity/RespuestaApi';

@Component({
  selector: 'app-list-cobro-admin',
  standalone: true,
  imports: [MatTableModule,
            MatFormFieldModule, 
            MatPaginatorModule, 
            MatInputModule, 
            MatIconModule, 
            PageHeaderComponent,
            MatButtonModule,
            RouterLink],
  templateUrl: './list-cobro-admin.component.html',
  styleUrl: './list-cobro-admin.component.css'
})
export class ListCobroAdminComponent implements OnInit, AfterViewInit {

  cobros: Cobro[];
  dataSource = new MatTableDataSource<Cobro>();
  displayedColumns: string[] = ['codigo', 'fecha', 'valorActual', 'mulTrabajo', 'mulReunion', 'mulDesfile',
  'cambioMedidor', 'nuevoSocio', 'insumo', 'otro', 'total', 'estado', 'cliente', 'acciones'];

  @ViewChild("listcobrofocus") focusListCobros: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  errorMessage: string = '';

  constructor(private service: ServiceService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getAllCobros();
  }

  getAllCobros = () => {
    this.service.getCobros()
      .subscribe(data => {
        this.cobros = data;
        this.dataSource.data = this.cobros;
        //console.log('res', data);
    },
    (error) => {
      this.errorMessage = error;
      this._snackBar.open('Error!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
    });
  }

  ngAfterViewInit() {
    this.focusListCobros.nativeElement.focus();
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

  Editar(cobro: Cobro): void {
    console.log("codigo cob: ", cobro.cob_codigo.toString());
    localStorage.setItem('codigoCobro', cobro.cob_codigo.toString());
    this.router.navigate(["add-cobro-admin"]);
  }

  /*
  Delete(cobro: Cobro) {
    if (window.confirm('Esta seguro de Eliminar el Cobro' + cobro.cob_fecha + " " + cobro.cob_total)) {
      this.service.deleteCliente(cobro.cob_codigo)
        .subscribe((response) => {
          this.cobros = this.cobros.filter(p => p !== cobro);
          this._snackBar.open('Cobro Eliminado ' + response, 'Exitósamente', { duration: 4000 });
          //alert("Usuario Eliminado..." + data.nombre);
          this.getAllCobros();
        })
    }
  }
  */

  Delete(cobro: Cobro) {
    if (window.confirm('Esta seguro de Eliminar el COBRO ' + cobro.cob_codigo + " " + cobro.cob_total)) {
      this.service.deleteCobro(cobro.cob_codigo).subscribe(
        
        (response: RespuestaApi) => {
          //this.respuestaApi = response;
          if (response.status === 1) {
            console.log('Success:', response.message);
            // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje o actualizar la UI
            this.cobros = this.cobros.filter(p => p !== cobro);
            this._snackBar.open('Success: ' + response.message, 'OK', { duration: 4000, verticalPosition: 'top'});
            this.getAllCobros();
          } else {
            console.log('Error:', response.message);
            // Aquí puedes manejar el caso de error según lo que responda el servidor
            this._snackBar.open('Error: ' + response.message, 'Cerrar', { duration: 4000, verticalPosition: 'top' });
          }
        },
        error => {
          console.error('Error al eliminar el COBRO:', error.message);
          // Aquí puedes manejar cualquier error que ocurra durante la solicitud
          this._snackBar.open('Error al eliminar el COBRO:' + error.message, 'Cerrar', { duration: 4000, verticalPosition: 'top'});
        }
      );
    }
  }


  addNewCobro(): void {
    //localStorage.clear();
    this.router.navigate(["list-medidor"]);
  }



}
