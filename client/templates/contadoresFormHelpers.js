Template.formContadores.events({
   'keyup #contadorEntrada':function(){
       var entrada = $('#contadorEntrada').val();
       Session.set('entrada',entrada);
   },
    'keyup #contadorSalida':function(){
        var salida = $('#contadorSalida').val();
        Session.set('salida',salida);
    },
    'click #borrar':function(){
      limpiaFormularioContadores();
  },
  'click #guardar':function(){
    var obj = {};
      obj.alias = Maquinitas.findOne({_id:Session.get('maquinita')}).alias;
      obj.idMaquinita = Session.get('maquinita');
      obj.fecha = new Date();
      obj.contadoresEntrada = $('#contadorEntrada').val();
      obj.contadoresSalida = $('#contadorSalida').val();
      obj.totalRecaudado = $('#recaudado').val();
      obj.totalMoneda = $('#totalMonedas').val();
      obj.totalComision = $('#comision').val();
      obj.totalCliente = $('#cliente').val();
      obj.totalNeto = $('#neto').val(); 
      if(obj.contadoresEntrada != '' && obj.contadoresSalida!=''){
        swal("Registro exitoso!", "contadores!", "success")
        Meteor.call('guardaContadores',obj);
        limpiaFormularioContadores();
      }else{
        swal("Error!", "Debes ingresar todos los datos!", "warning")
      }
      
  }
});
Template.formContadores.helpers({
   'totalMonedas':function(){
       var entrada = parseInt(Session.get('entrada'));
       var salida = parseInt(Session.get('salida'));
       if(entrada !=='' && salida !==''){
           var total =entrada - salida;
           Session.set('totalRecaudado',total);
           return total;
       }else{
           return 0;
       }
   },
    'totalRecaudado':function(){
       
        var totalMonedas = parseInt(Session.get('totalRecaudado'));
        if(totalMonedas!==''){
            var id = Session.get('maquinita');
            var datos = Maquinitas.find({_id:id}).fetch();
            var denominacion = parseInt(datos[0].denominacion);
            var cantidadRecaudada = totalMonedas*denominacion;
            Session.set('recaudado',cantidadRecaudada);
            return accounting.formatMoney(cantidadRecaudada);
        }else{
           return 0; 
        }
      
    },
    'comision':function(){
        var id = Session.get('maquinita');
        if(id!==''){
            var data=Maquinitas.find({_id:id}).fetch();

            var comision = data[0].comision;
            return comision+' %';
        }else{
            return null;
        }
    },
    'totaCliente':function(){
        var id = Session.get('maquinita');
        var total = parseInt(Session.get('totalRecaudado'));
        if(id!==''){
            var data=Maquinitas.find({_id:id}).fetch();
            var comision = parseInt(data[0].comision);
            var denominacion = parseInt(data[0].denominacion);
            var pesos = total*denominacion;
            var totalCliente = (pesos*comision)/100;
            Session.set('totalCliente',totalCliente);
            return accounting.formatMoney(totalCliente);
            
        }
    },
    'neto':function () {
        var totalRecaudado = parseInt(Session.get('recaudado'));
        var totalCliente = parseInt(Session.get('totalCliente'));
        if(totalRecaudado!==''&&totalCliente!==''){
            var totalneto =totalRecaudado-totalCliente;
            return accounting.formatMoney(totalneto);
        }
    },
    'fecha':function () {
        var fecha = formateaFecha(new Date());

        return fecha;
    }
});


limpiaFormularioContadores = function(){
    $('#contadorEntrada').val('');
     $('#contadorEntrada').blur();
    // $('#contadorEntrada').blur();
    $('#contadorSalida').val('');
    $('#contadorSalida').blur();
    // $('#contadorSalida').blur();
    // $('#recaudado').blur();
    //$('#totalMonedas').val('');
    // $('#totalMonedas').blur();
   // $('#comision').val('');
    // $('#comision').blur();
    //$('#cliente').val('');
    // $('#cliente').blur();
    //$('#neto').val('');
    // $('#neto').blur();
    Session.set('totalCliente','');
    Session.set('recaudado','');
    Session.set('totalRecaudado','');
    Session.set('salida','');
    Session.set('entrada','');
    //Session.set('maquinita','');
}