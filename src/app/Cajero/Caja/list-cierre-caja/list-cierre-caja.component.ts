import { ChangeDetectionStrategy, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Cobro } from '../../../Entity/Cobro';
import { ServiceService } from '../../../Service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../Service/shared.service';
import { Usuario } from '../../../Entity/Usuario';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-cierre-caja',
  standalone: true,
  imports: [MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    PageHeaderComponent,
    MatButtonModule,
    RouterLink,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-cierre-caja.component.html',
  styleUrl: './list-cierre-caja.component.css',
})
export class ListCierreCajaComponent implements OnInit  {

  step = signal(0);

  cobros: Cobro[];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['num_recibo', 'fecha_pago', 'cedula', 'nombre', 'apellido', 'num_medidor', 'fecha_consumo', 'total_cobrado'];

  selectedDate: Date;
  selectedDate2: Date;
  selectedDate3: Date;
  fechaFormateda: String;
  valorSumaPorFechaActual: number;
  highlightInput: boolean = false;
  errorMessage: string;

  recibos: any[] = [];

  fechaInicio: String 
  fechaFin: String 

  usuario: Usuario = new Usuario();


    // Referencia al elemento input para resetear la clase highlight
    @ViewChild('valorSumaInput') valorSumaInput: ElementRef;

  constructor(private service: ServiceService, private router: Router, private _snackBar: MatSnackBar,
              private sharedService: SharedService) { }

  ngOnInit() {
    //this.getAllCobros();
  }

   // Método para verificar si el campo tiene un valor
   hasValue(): boolean {
    return !!this.valorSumaPorFechaActual;
  }

  getCuadreSumaFechaActual(fecha: Date): void {
    this.getUsuario();
    this.service.getCuadreSumaFechaActualCajero(fecha, this.usuario.user)
    .subscribe(data => { 
      console.log("data: " + data);
      this.valorSumaPorFechaActual = data;
      console.log("data2: " + this.valorSumaPorFechaActual);

          // Activar la clase highlight por un breve período de tiempo
      this.highlightInput = true;
      setTimeout(() => {
        this.highlightInput = false;
      }, 3000); // Duración en milisegundos del destello (ej. 1000ms = 1 segundo)
    },
    (error) => {
      this.errorMessage = error;
      this._snackBar.open('Error!!', 'No existe VALOR para la fecha: ' + this.formatDate(fecha), { duration: 2000, verticalPosition: 'top' });
      this.valorSumaPorFechaActual = 0;
    });
  }

  getUsuario() : void {
    this.sharedService.currentUser.subscribe((data) => {
      this.usuario = data;
      console.log('Objeto recibido:', this.usuario.user);
    });
  }


  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log("fecha: " + this.selectedDate )
    // Ejemplo utilizando moment.js    '2024-07-03'
    //this.fechaFormateda = moment(this.selectedDate).format('YYYY-MM-DD');
    //console.log("fehca formateada: " + this.fechaFormateda); // Salida formateada usando moment.js
    this.getCuadreSumaFechaActual(this.selectedDate);
  }

  onDateChangeFechaInicio(event: any) {
   this.fechaInicio= this.formatDate(event.value);  
  }

  onDateChangeFechaFin(event: any) {
    this.fechaFin= this.formatDate(event.value);
  }


  btnLoadRecibosAllFechas(): void {
    this.getUsuario();
    this.service.getDataAllRecibosCajero( this.fechaInicio, this.fechaFin, this.usuario.user)
    .subscribe(data => {
      console.log("Data: " + data);
      this.recibos = data;
      console.log(this.recibos);
      //this.dataSource.data = data;
    },
    (error) => {
      this.errorMessage = error;
      this._snackBar.open('Error!!', this.errorMessage, { duration: 2000, verticalPosition: 'top' });
      this.recibos = [];
    });
  }


    exportarAExcel(): void {
      // Construir los datos a exportar
      const datosExportar = this.recibos.map(recibo => ({
        '# Recibo': recibo[0],
        'Fecha Pago': this.formatReciboDate(recibo[1]),
        'Cédula': recibo[2],
        'Nombre': recibo[3],
        'Apellido': recibo[4],
        '# Medidor': recibo[5],
        'Fecha Consumo': recibo[6],
        'Total Cobrado': recibo[7]
      }));
  
      // Crear una hoja de Excel a partir de los datos
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);
  
      // Crear el libro de Excel y agregar la hoja
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Recibos');
  
      // Guardar el archivo Excel
      XLSX.writeFile(wb, 'cobros_(' + this.fechaInicio + '_-_' +  this.fechaFin + ')'+'.xlsx');
    }




  


  formatReciboDate(reciboDate: string): string {
    const date = new Date(reciboDate);
    const formattedDate = `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}`;
    const formattedTime = `${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}:${this.padNumber(date.getSeconds())}`;
    return `${formattedDate} ${formattedTime}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  private formatDate(date: Date): string {
    // Formato para fecha y hora: 'YYYY-MM-DDTHH:mm:ss'
    return date.toISOString().split('T')[0];
  }



  
  /*
  formatReciboDate(reciboDate: string): string {
    const date = new Date(reciboDate);
    return date.toISOString().split('T')[0];
  }


    */

















  addNewCobro(): void {
    localStorage.clear();
    this.router.navigate(["list-cliente"]);
  }

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

}