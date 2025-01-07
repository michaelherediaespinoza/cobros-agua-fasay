import { Injectable } from '@angular/core';
import { Cliente } from '../Entity/Cliente';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Medidor } from '../Entity/Medidor';
import { throwError, Observable } from 'rxjs';
import { RespuestaApi } from '../Entity/RespuestaApi';
import { Cobro} from '../Entity/Cobro';
import { Usuario } from '../Entity/Usuario';
import { Recibo } from '../Entity/Recibo';
import { catchError } from 'rxjs/operators';
import { Rol } from '../Entity/Rol';
import { Agencia } from '../Entity/Agencia';
import { cargo } from '../Entity/Cargo';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private ipConexeion: string = "http://192.168.88.61:8080";

  constructor(private http: HttpClient) { }

  //CLIENTE

  UrlInsertCliente = this.ipConexeion+'/api/cliente/save';
  UrlListClientes = this.ipConexeion+'/api/cliente/allclientes';
  UrlDeleteCliente = this.ipConexeion+'/api/cliente/delete';
  UrlUpdateCliente = this.ipConexeion+'/api/cliente/update';
  UrlGetClientePorCodigo = this.ipConexeion+'/api/cliente/getcliporcodigo';

  //MEDIDOR

  UrlInsertMedidor = this.ipConexeion + '/api/medidor/save1';
  UrlListMedidores = this.ipConexeion + '/api/medidor/medres';
  UrlDeleteMedidor = this.ipConexeion + '/api/medidor/delete';
  UrlUpdateMedidor = this.ipConexeion + '/api/medidor/update';
  UrlGetMedidorPorCodigo = this.ipConexeion + '/api/medidor/getmedporcodigo';

  // COBRO
  UrlInsertCobro = this.ipConexeion + '/api/cobro/savecobro';
  UrlListCobros = this.ipConexeion + '/api/cobro/allcobros';
  UrlListCobrosPorClienteCedula = this.ipConexeion + '/api/cobro/getcobporcedulacliente';
  UrlGetCobroPorCodigo = this.ipConexeion + '/api/cobro/getcobporcodigo';
  //UrlUpdateCobroEstado2 = this.ipConexeion+'/api/cobro/update2';
  UrlUpdateCobroEstado = this.ipConexeion + '/api/cobro/update';
  UrlDeleteCobro = this.ipConexeion + '/api/cobro/delete';
  UrlUpdateCobroAll = this.ipConexeion + '/api/cobro/updateall';
  UrlGetCobropendientesFechas = this.ipConexeion + '/api/cobro/allcobrospendientesfechas';


  // RECIBO
  UrlGetMaxNumeroRecibo = this.ipConexeion+'/api/recibo/max-numero-recibo';
  UrlInsertReciboAll = this.ipConexeion+'/api/recibo/saverecibo';
  UrlSumaTotalReciboFechaActual = this.ipConexeion+'/api/recibo/getcuadresumafechaactual';
  //UrlSumaTotalReciboFechaUsuario = this.ipConexeion+'/api/recibo/getcuadresumafechausuario';
  UrlSumaTotalReciboFechaActualCajero = this.ipConexeion+'/api/recibo/getcuadresumafechaactualcajero';
  UrlSumaTotalReciboFechaInioFinUsuarioAdmin = this.ipConexeion + '/api/recibo/getsumafechainiciofinusuarioadmin';
  UrlGetAllDataPorFechas = this.ipConexeion+'/api/recibo/data-all-porfechas';
  UrlGetAllDataPorFechasCajero = this.ipConexeion+'/api/recibo/data-all-porfechas-cajero';



  // Usuario

  UrlGetUsuarioByCodigo = this.ipConexeion+'/api/user/getusuariobycodigo';
  UrlGetUsuarioByUsuario = this.ipConexeion+'/api/user/getbyusu';
  UrlInsertUsuario = this.ipConexeion+'/api/user/save';
  UrlUpdateUsuario = this.ipConexeion+'/api/user/update';
  UrlListUsuarios = this.ipConexeion+'/api/user/getallusuarios';

  // ROL

  UrlListRoles = this.ipConexeion+'/api/rol/allroles';


  // CARGO

  UrlListCargos = this.ipConexeion+'/api/cargo/allcargos';


  // AGENCIA

  UrlListAgencias = this.ipConexeion+'/api/agencia/allagencias';





    // CLIENTES

    createCliente1(cliente: Cliente) {
      return this.http.post<Cliente>(this.UrlInsertCliente, cliente).pipe(
        catchError(this.handleError)
      );
    }
    createCliente(cliente: Cliente) {
      return this.http.post<RespuestaApi>(this.UrlInsertCliente, cliente).pipe(
        catchError(this.handleError)
      );
    }

    getClientes(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.UrlListClientes).pipe(
        catchError(this.handleError)
      );
    }

   getClientePorCodigo(codigo: number) {
      return this.http.get<Cliente>(this.UrlGetClientePorCodigo + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }

    updateCliente(cliente: Cliente) {
      console.log("prueba_002  ", cliente);
      //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
      return this.http.put<Cliente>(this.UrlUpdateCliente +"/" + cliente.codigo, cliente).pipe(
        catchError(this.handleError)
      );
    }
  
    deleteCliente(codigo: number) {
      return this.http.delete<RespuestaApi>(this.UrlDeleteCliente + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }





    //MEDIDOR


    createMedidor(medidor: Medidor) {
      return this.http.post<RespuestaApi>(this.UrlInsertMedidor, medidor).pipe(
        catchError(this.handleError)
      );
    }

    getMedidores(): Observable<Medidor[]> {
      return this.http.get<Medidor[]>(this.UrlListMedidores).pipe(
        catchError(this.handleError)
      );
    }

   getMedidorPorCodigo(codigo: number) {
      return this.http.get<Medidor>(this.UrlGetMedidorPorCodigo + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }

    updateMedidor(medidor: Medidor) {
      console.log("prueba_002  ", medidor);
      return this.http.put<Medidor>(this.UrlUpdateMedidor +"/" + medidor.codigo, medidor).pipe(
        catchError(this.handleError)
      );
    }
  
    deleteMedidor(codigo: number) {
      return this.http.delete<RespuestaApi>(this.UrlDeleteMedidor + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }




    //COBRO

    createCobro(cobro: Cobro) {
      return this.http.post<RespuestaApi>(this.UrlInsertCobro, cobro).pipe(
        catchError(this.handleError)
      );
    }

    getCobroPorCodigo(codigo: number) {
      return this.http.get<Cobro>(this.UrlGetCobroPorCodigo + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }

    getCobros() {
      return this.http.get<Cobro[]>(this.UrlListCobros).pipe(
        catchError(this.handleError)
      );
    }

    getCobrosPorClienteCedula(cedula: String) {
      return this.http.get<Cobro[]>(this.UrlListCobrosPorClienteCedula + "/" + cedula).pipe(
        catchError(this.handleError)
      );
    }

    /*
    updateCobroEstado2(codigo: number, estado: String): Observable<any> {
     // return this.http.get<Cobro[]>(this.UrlUpdateCobroEstado + "/" + codigo);
      return this.http.put(this.UrlUpdateCobroEstado2 + "/" + codigo, estado);
    }
    */

    updateCobroEstado(cobro: Cobro) {
      console.log("prueba_002  ", cobro.cob_codigo);
      //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
      return this.http.put<Cobro>(this.UrlUpdateCobroEstado +"/" + cobro.cob_codigo, cobro).pipe(
        catchError(this.handleError)
      );
    }

    updateCobroAll(cobro: Cobro) {
      console.log("prueba_002  ", cobro.cob_codigo);
      //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
      return this.http.put<RespuestaApi>(this.UrlUpdateCobroAll +"/" + cobro.cob_codigo, cobro).pipe(
        catchError(this.handleError)
      );
    }

    deleteCobro(codigo: number) {
      return this.http.delete<RespuestaApi>(this.UrlDeleteCobro + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }

    getCobrosPendientesFechas(fechainicio: String, fechafin: String): Observable<any[]> {
      return this.http.get<any[]>(this.UrlGetCobropendientesFechas + "/" + fechainicio + "/" + fechafin).pipe(
       catchError(this.handleError)
     );
   }




    //  RECIBO

    getMaxNumeroRecibo(): Observable<number> {
      return this.http.get<number>(this.UrlGetMaxNumeroRecibo).pipe(
        catchError(this.handleError)
      );
    }

    createRecibo(recibo: Recibo) {
      return this.http.post<RespuestaApi>(this.UrlInsertReciboAll, recibo).pipe(
        catchError(this.handleError)
      );
    }

    getCuadreSumaFechaActual(fechaActual: Date): Observable<number> {
      return this.http.get<number>(this.UrlSumaTotalReciboFechaActual + "/" + fechaActual).pipe(
        catchError(this.handleError)
      );
    }

    getCuadreSumaFechaActualCajero(fechaActual: Date, user: String): Observable<number> {
      return this.http.get<number>(this.UrlSumaTotalReciboFechaActualCajero + "/" + fechaActual + "/" + user).pipe(
        catchError(this.handleError)
      );
    }

    getCuadreSumaFechaInicioFinUsuarioAdmin(fechaInicio: Date, fechaFin: Date, user: String): Observable<number> {
      return this.http.get<number>(this.UrlSumaTotalReciboFechaInioFinUsuarioAdmin + "/" + fechaInicio  + "/" + fechaFin + "/" + user).pipe(
        catchError(this.handleError)
      );
    }

    getDataAllRecibos(fechainicio: String, fechafin: String): Observable<any[]> {
       return this.http.get<any[]>(this.UrlGetAllDataPorFechas + "/" + fechainicio + "/" + fechafin).pipe(
        catchError(this.handleError)
      );
    }

    getDataAllRecibosCajero(fechainicio: String, fechafin: String, user: String): Observable<any[]> {
      return this.http.get<any[]>(this.UrlGetAllDataPorFechasCajero + "/" + fechainicio + "/" + fechafin + "/" + user).pipe(
       catchError(this.handleError)
     );
   }


    

    //  USUARIO 

    getUsuarioById(codigo: number): Observable<Usuario> {
      return this.http.get<Usuario>(this.UrlGetUsuarioByCodigo + "/" + codigo).pipe(
        catchError(this.handleError)
      );
    }

    getUsuarioByUsuario(usuario: String): Observable<Usuario> {
      return this.http.get<Usuario>(this.UrlGetUsuarioByUsuario + "/" + usuario).pipe(
        catchError(this.handleError)
      );
    }

    createUsuario(usuario: Usuario) {
      return this.http.post<RespuestaApi>(this.UrlInsertUsuario, usuario).pipe(
        catchError(this.handleError)
      );
    }

    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.UrlListUsuarios).pipe(
        catchError(this.handleError)
      );
    }

    updateUsuario(usuario: Usuario) {
      //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
      return this.http.put<Usuario>(this.UrlUpdateUsuario +"/" + usuario.codigo, usuario).pipe(
        catchError(this.handleError)
      );
    }


    // ROLE

    getRoles(): Observable<Rol[]> {
      return this.http.get<Rol[]>(this.UrlListRoles).pipe(
        catchError(this.handleError)
      );
    }


    // AGENCIA

    getAgencias(): Observable<Agencia[]> {
      return this.http.get<Agencia[]>(this.UrlListAgencias).pipe(
        catchError(this.handleError)
      );
    }


       // CARGO

       getCargos(): Observable<cargo[]> {
        return this.http.get<cargo[]>(this.UrlListCargos).pipe(
          catchError(this.handleError)
        );
      }







    /*
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        if (error.status === 0) {
          errorMessage = 'No communication with the server. Please check your network connection.';
        }else if(error.status === 500) {
          errorMessage = 'Error Interno del Servidor. Por favor, inténtelo de nuevo más tarde.';
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      return throwError(errorMessage);
    }

    */

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side errors
        switch (error.status) {
          case 0:
            errorMessage = 'No hay comunicación con el servidor. Por favor verifique su conexión de red.';
            break
          case 400:
            errorMessage = 'Solicitud incorrecta. Por favor revisa tu entrada.';
            break;
          case 401:
            errorMessage = 'No autorizado. Por favor Iniciar sesión.';
            break;
          case 403:
            errorMessage = 'Prohibido. No tienes permiso para realizar esta acción.';
            break;
          case 404:
            errorMessage = 'Not Found. No se pudo encontrar el recurso solicitado.';
            break;
          case 408:
            errorMessage = 'Request Timeout. Por favor, inténtelo de nuevo más tarde.';
            break;
          case 500:
            errorMessage = 'Error Interno del Servidor. Por favor, inténtelo de nuevo más tarde.';
            break;
          case 502:
            errorMessage = 'Bad Gateway. Por favor, inténtelo de nuevo más tarde.';
            break;
          case 503:
            errorMessage = 'Servicio No Disponible. Por favor, inténtelo de nuevo más tarde.';
            break;
          case 504:
            errorMessage = 'Gateway Timeout. Por favor, inténtelo de nuevo más tarde.';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      return throwError(errorMessage);
    }
}
