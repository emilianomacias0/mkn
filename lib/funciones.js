/**
 * Created by emi on 11/08/16.
 */

formateaFecha = function (fecha) {
    var mes,dia,anio;
    anio = fecha.getFullYear();
    mes = fecha.getMonth()+1;
    dia = fecha.getDate();
    
    return dia+"/"+mes+"/"+anio;
    
}