import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Cobro } from '../../../Entity/Cobro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiceService } from '../../../Service/service.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { format } from 'date-fns';
import moment from 'moment';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Recibo } from '../../../Entity/Recibo';
import { Usuario } from '../../../Entity/Usuario';
import { CommonModule, DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import { IComboSelectionChangingEventArgs, IgxComboModule, IgxIconModule  } from 'igniteui-angular';
import { Cliente } from '../../../Entity/Cliente';
import { RespuestaApi } from '../../../Entity/RespuestaApi';

//import { PdfmakeModule } from 'ng-pdf-make';


@Component({
  selector: 'app-add-cobro-caja',
  standalone: true,
  imports: [MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    PageHeaderComponent,
    MatButtonModule,
    RouterLink,
    MatGridListModule,
    MatDialogModule,
    CommonModule,
    IgxComboModule,
    IgxIconModule,
  ],
  templateUrl: './add-cobro-caja.component.html',
  styleUrl: './add-cobro-caja.component.css'
})
export class AddCobroCajaComponent implements OnInit, AfterViewInit  {

  usuario: Usuario = new Usuario();
  recibo: Recibo = new Recibo();
  cobro: Cobro = new Cobro();
  cobros: Cobro[];
  lData: Cliente[] = [];
  dataSource = new MatTableDataSource<Cobro>();
  displayedColumns: string[] = ['codigo', 'fecha', 'valorActual', 'mulTrabajo', 'mulReunion', 'mulDesfile',
  'cambioMedidor', 'nuevoSocio', 'insumo', 'otro', 'total', 'estado', 'cedula', 'nombre', 'acciones'];

  cedulaCliente: String;
  nombreApellidoCliente: String;
  //codigoCobroParaUpdateEstado: number;
  formattedDate: any;
  dialogRef: MatDialogRef<any>; // Declarar dialogRef como propiedad de la clase

  // variable para mostrar un mensaje de guardado cobro oh un error 
  aux: number = 2;
  errorMessage: string;
  errorGuardarCobro: boolean = false;

  // Variable para controlar la visibilidad del botón de guardar y cancelar esconder para que imprima sin eso
  isButtonVisible: boolean = true;
  // visible parfa que miestrel el cajero y pueda firmar
  isCajeroVisible: boolean = true

    // DATOS PARA IMPRIMIR EL RECIBO
  fechaHoraFormateada: any;
  cedulaClienteRecibo: String;
  nombresClienteRecibo: String;
  apellidosClienteRecibo: String;
  fechaConsumoAguaRecibo: Date;
  numeroMedidorRecibo: string;
  totalApagarRecibo: number;
  maxNumeroRecibo: number;
  nombresCajero: String;
  nombresCajeroConUsuario: String;
  observacion: String

  @ViewChild("listcobrofocus") focusListCobros: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("myModalRecibo", { static: false }) myModalRecibo: TemplateRef<any>;
  @ViewChild('pdfTableRecibo') pdfTableRecibo: ElementRef;


  constructor(private service: ServiceService, private router: Router, private dialog: MatDialog, private _snackBar: MatSnackBar,  private datePipe: DatePipe ) { }

  ngOnInit() {
    //this.getAllCobros();
    this.isButtonVisible == true;
    this.errorGuardarCobro == false;
    this.isCajeroVisible = !this.isCajeroVisible;
    this.getDataAllClientes();
    this.getUserlogiado();
    //this.someOtherMethod();
    
  }

  onEnterPress(): void {
    console.log('Enter key pressed!');
    this.getAllCobrosPorClienteCedula();  // PRESIONA ENTER PARA BUSCAR COBROS POR CEDULA
    for (let cobro of this.cobros) {
      const nombre = cobro.medidor.cliente.nombre;
      const apellido = cobro.medidor.cliente.apellido;
      this.nombreApellidoCliente = nombre + " " + apellido;
    }
  }

  getAllCobros = () => {
    this.service.getCobros()
      .subscribe(data => {
        this.cobros = data;
        this.dataSource.data = this.cobros;
        console.log('res', data);
      })
  }

  getCodigoCobroParaUpdateEstado(cobro: Cobro): void {
    this.aux = 1;
    this.observacion = "";
    this.isButtonVisible = true;
    //console.log(" DATOS ANTES DE AGUARDAR  .... ");
    //console.log("CODIGO COBRO: " + cobro.cob_codigo, " Estado: " + cobro.cob_estado, " Fecha: " + cobro.cob_fecha + " Total: " + cobro.cob_total);
    //this.codigoCobroParaUpdateEstado = cobro.cob_codigo;
    this.cobro = cobro;
   // console.log("CODIGO COBRO: " + cobro.cob_codigo, " Estado Actual: " + cobro.cob_estado, " Fecha: " + cobro.cob_fecha + " Total: " + cobro.cob_total);
    this.openModalReciboCobroAgua();
    this.getFechaHoraActual();
    this.getDataParaRecibo();
    this.getMaxNumeroRecibo();
    this.getUserlogiado();
   }

   getDataParaRecibo(): void {
      //this.service.getCobroPorCodigo(this.cobro.cob_codigo).subscribe(data => {  })
      this.cedulaClienteRecibo = this.cobro.medidor.cliente.cedula;
      this.nombresClienteRecibo = this.cobro.medidor.cliente.nombre;
      this.apellidosClienteRecibo = this.cobro.medidor.cliente.apellido;
      this.fechaConsumoAguaRecibo = this.cobro.cob_fecha; 
      this.numeroMedidorRecibo = this.cobro.medidor.numero;
      this.totalApagarRecibo = this.cobro.cob_total;
    }

    getMaxNumeroRecibo(): void {
      console.log("numero masximo: " +  this.maxNumeroRecibo);
      this.service.getMaxNumeroRecibo()
      .subscribe(data => {
        console.log("Data Num mAXIMO: " + data);
        this.maxNumeroRecibo = data;
        this.maxNumeroRecibo +=1;
        console.log("Data Num mAXIMO final: " + this.maxNumeroRecibo);
      },
      error => {
        alert('Error al recuperar numero Maximo: ' + error.error);
        // manejo de errores
      })
    }

    saveReciboUpdateEstadoCobroImprimir(): void {
      this.getMaxNumeroRecibo(); // para validar que al presionar guadar tengo el valor unico si otra cajera abre al mismo tiempo un cobro
      this.saverecibo();
      if(this.errorGuardarCobro == true) {  // valida si no tiene error al guardar el cobro si sale error sale la alerta y no hace ninguna accion mas
        this.errorGuardarCobroAlerta();
        this.closeDialog();
        }else {
        this.updateCobroEstado();
        this.alertSaveBien();
        this.printPDFRecibo();
        this.closeDialog();
        this.getAllCobrosPorClienteCedula();
      }
    }

  updateCobroEstado() {
    //this.saverecibo();

    //const cobCodigo = this.codigoCobroParaUpdateEstado; // Código del cobro a actualizar
    console.log("   DATOS PAR AGUARDAR  .... ");
    this.cobro.cob_estado = 'C';   // Nuevo estado Cobrado
    console.log("CODIGO COBRO: " + this.cobro.cob_codigo, " Estado Actual: " + this.cobro.cob_estado, " Fecha: " + 
                                   this.cobro.cob_fecha + " Total: " + this.cobro.cob_total);
    this.service.updateCobroEstado(this.cobro)
    .subscribe(data => {
      this.cobro = data;
      //this.alertSaveBien();
      //this.getAllCobrosPorClienteCedula();
      //this.closeDialog();
      
    })
  }

  // Metodo para recuperar todo el obgeto de ususairo logiado, buscamos por codigo
  getUserlogiado(): void {
    let usuarioLogin = localStorage.getItem('usuariologin');

    if (usuarioLogin !== null) {
      let usuarioLoginInt = parseInt(usuarioLogin); // Convierte a entero
      if (!isNaN(usuarioLoginInt)) {
          console.log("user logiado CODIGO: " + usuarioLoginInt); // Aquí puedes usar el valor convertido
          this.service.getUsuarioById(usuarioLoginInt)
          .subscribe(data => {
            this.nombresCajero = data.nombre + " " + data.apellido;
            this.nombresCajeroConUsuario = data.nombre + " " + "(" + data.user + ")";
            this.usuario = data;
            //console.log("DATA: " );
            //localStorage.removeItem('usuariologin');
          }) 
      } else {
          console.error('No se pudo convertir a número.');
      }
    } else {
        console.error('No hay usuario en el localStorage.');
      }
  }

  saverecibo(): void {
    console.log("hoar: " + this.fechaHoraFormateada);
    const date = new Date(this.fechaHoraFormateada);
   
    //Construimos el objeto RECIBO para GUARDAR
    this.recibo.fechaHora = date;
    console.log("Eneviando...: " + this.recibo.fechaHora );
    
    this.recibo.numero = this.maxNumeroRecibo;
    this.recibo.observacion = this.observacion;
    this.recibo.cobro = this.cobro;
    this.recibo.usuario = this.usuario;

    this.service.createRecibo(this.recibo)
    .subscribe(data => {
      console.log("Response of Server: " + data.message);
      console.log("Response of Server: " + data.status);
    },
      (error) => {
        this.errorMessage = error;
        this._snackBar.open('Error!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
        this.errorGuardarCobro === true;
      });
  }




  /*

  updateCobroEstado2() {
    const cobCodigo = this.codigoCobroParaUpdateEstado; // Código del cobro a actualizar
    const cobEstado = 'C'; // Nuevo estado Cobrado
    this.service.updateCobroEstado2(cobCodigo, cobEstado)
      .subscribe(response => {
        console.log('Cobro actualizado:', response);
      },
      error => {
        console.error('Error actualizando cobro:', error);
      }
    );
  }
    */

  getAllCobrosPorClienteCedula = () => {
    this.service.getCobrosPorClienteCedula(this.cedulaCliente)
      .subscribe(data => {
        console.log("111: " + data.length);
        this.cobros = data;
        this.errorMessage = "";
        console.log("222: " +this.cobros.length);
        console.log("auxiliar 1: " + this.aux);
        
          if (this.cobros.length == 0 && this.aux > 1) {
              this.alerta();
              this.nombreApellidoCliente = "";
              console.log("auxiliar 2: " + this.aux);
              console.log('entrooooo', data);
          }else if (this.cobros.length == 0 && this.aux == 1){
                    this.limpiarDatos();
                    this.aux = 2;
                    console.log("auxiliar 3: " + this.aux);
          } else { 
              this.dataSource.data = this.cobros;
              //this.aux = 2;
              console.log('res 22', data);
              console.log("auxiliar 4: " + this.aux);
            }
            //this.aux === 2;
      },
       (error) => {
        this.errorGuardarCobro == true;
        this.errorMessage = error;
        this._snackBar.open('Error!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
      }
    );
  }


   // Método para limpiar los datos de la tabla
   limpiarDatos() {
      this.dataSource.data = [];
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

  addNewCobro(): void {
    localStorage.clear();
    this.router.navigate(["list-cliente"]);
  }

  errorGuardarCobroAlerta(): void {
    Swal.fire({
      position: "top-end",
      text: "CLIENTE",
      title: "ERROR: " + this.errorMessage,
      icon: "warning",
      showConfirmButton: false,
      timer: 1800
    });
  }

  alerta(): void {
    this.limpiarDatos();
    Swal.fire({
      position: "top-end",
      text: "CLIENTE",
      title: "Datos no encontrados para:" + this.cedulaCliente,
      icon: "warning",
      showConfirmButton: false,
      timer: 1800
    });
  }

  alertSaveBien(): void {
    Swal.fire({
      position: "top-end",
      text: "COBRO",
      title: "Cobro realizado Correctamente:",
      icon: "success",
      showConfirmButton: false,
      timer: 1800
    });
  }

  confirmacionGuardarCobro(): void {
    this.isButtonVisible = !this.isButtonVisible; //esconde los botones para poder imprimir sin los mismos
    this.isCajeroVisible = true;
    Swal
    .fire({
        title: "Esta seguro de realizar el cobro",
        text: "¿Guardar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, Guardar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*Se ejecuta la Operación*");            
            this.saveReciboUpdateEstadoCobroImprimir();
        } else {
            // Dijeron que no
            console.log("*Operación cancelada*");
            this.isButtonVisible = true;
            this.isCajeroVisible = !this.isCajeroVisible;
          }
    });
  }

  openModalReciboCobroAgua(): void {
    this.dialogRef = this.dialog.open(this.myModalRecibo, { width: '50%', panelClass: 'icon-outside', });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result)
        
        console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

    // Otro método que accede a dialogRef
    someOtherMethod() {
      if (this.dialogRef) {
        // Hacer algo con dialogRef
        console.log("El dialog aún está abierto", this.dialogRef);
      } else {
        console.log("El dialog no está abierto o ha sido cerrado");
      }
    }
  
    // Método para cerrar el diálogo programáticamente
    closeDialog() {
      if (this.dialogRef) {
        this.dialogRef.close('Cerrado programáticamente');
      }
    }

    closeModal() {
      this.dialogRef.close({ data: 'some data' });
    }

    getFechaHoraActual(): void {
      const fechaHoraActual = new Date();
      //const fechaHoraFormateadaaaa = format(fechaHoraActual, 'yyyy-MM-dd HH:mm:ss');
      this.fechaHoraFormateada = format(fechaHoraActual, 'yyyy-MM-dd HH:mm:ss');
      console.log(this.fechaHoraFormateada); // Esto mostrará la fecha y hora en el formato personalizado

    }

    getDataAllClientes(): void {
      this.service.getClientes().subscribe(
        (data: Cliente[]) => {
        this.lData = data;
        //data.forEach(element => {
        //  console.log("nombre: " + element.nombre);
        //  console.log("Codigo: " + element.codigo);          
        //});
      },
      (error) => {
       this.errorMessage = error;
       this._snackBar.open('Error!!', 'Validación ' + this.errorMessage, { duration: 8000, verticalPosition: 'top' });
      });
    }
    
    onSelectionChange(event: IComboSelectionChangingEventArgs): void {
      //console.log('Selected item:', event.newSelection);
      
      if (event.newSelection.length > 1) {
        event.cancel = true;  // Cancel the selection change if more than one item is selected
        return;
      }
      const selectedItems = event.newSelection;
      selectedItems.forEach(item => {
        console.log('Cedulaaaaa:', item.cedula);
        this.cedulaCliente = item.cedula;
        this.nombreApellidoCliente = item.nombre + " " + item.apellido;
      });  
    }

    public downloadPDFTableRecibo(): void {
      //const doc = new jsPDF('landscape', 'mm', 'a4');
  
      const pdfTableRecibo = this.pdfTableRecibo.nativeElement;
  
      var html = htmlToPdfmake(pdfTableRecibo.innerHTML);
  
      const documentDefinition: any = {
        pageOrientation: 'landscape',
        pageSize: 'A4',
        content: [
          {
            text: 'LISTA DE RECIBOS DESDE ',
            bold: true,
            fontSize: 20,
            alignment: 'center',
            color: '#047886',
            margin: [0, 0, 0, 20]
          },
          html
        ]
      };
      pdfMake.createPdf(documentDefinition).open();
  
    }


    printPDFRecibo() {

      const DATA = this.pdfTableRecibo.nativeElement;
      const doc = new jsPDF('p', 'pt', 'a4');
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = (doc as any).getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
         // Redimensionar la imagen al 50% del tamaño original
         const newWidth = pdfWidth * 0.8;
         const newHeight = pdfHeight * 0.8;
         const marginLeft = (pdfWidth - newWidth) / 2; // Centrar la imagen
   
         doc.addImage(imgData, 'PNG', marginLeft, 0, newWidth, newHeight);
         doc.save('fasay_recibo_agua.pdf');
       });
    }



    /* 
     njncjsd
  


     openDialogExamenRadiologia2(): void {
      this.dialogRef = this.dialog.open(this.myModalComprobante2, { 
        panelClass: 'custom-dialog-container icon-outside',
      });
  
      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log("HELLOO..  ", `Dialog result: ${result}`);
        }
      });
    }
  
    closeDialog2() {
      if (this.dialogRef) {
        this.dialogRef.close('Cerrado programáticamente');
      }
    }

      */
  
}