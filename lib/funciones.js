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

obtieneDistintasMaquinitas = function(){
	var data = Maquinitas.find().fetch();
	var alias=[];
	for (var i = 0; i < Object.keys(data).length; i++) {
		var obj = {label:data[i].alias,value:data[i].alias}
		alias.push(obj);
	}
	return alias;
}

limpiaFormularioRegistro = function(){
	$('#ubicacion').val('');
	$('#alias').val('');
	$('#tipo').val('');
	$('#denominacion').val('');
	$('#acargo').val('');
	$('#telefono').val('');
	$('#comision').val('');

	$('#ubicacion').blur();
	$('#alias').blur();
	$('#tipo').blur();
	$('#denominacion').blur();
	$('#acargo').blur();
	$('#telefono').blur();
	$('#comision').blur();
}
