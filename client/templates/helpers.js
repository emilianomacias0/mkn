/**
 * Created by emi on 9/08/16.
 */
Template.formularioRegistro.events({
    'submit form':function(evt){
        evt.preventDefault();
    },
   'click #boton':function(evt){
       evt.preventDefault();
       var obj={};
       obj.ubicacion = $('#ubicacion').val();
       obj.tipo = $('#tipo').val();
       obj.alias=$('#alias').val();
       obj.denominacion=$('#denominacion').val();
       obj.encargado=$('#acargo').val();
       obj.telefono=$('#telefono').val();
       obj.comision=$('#comision').val();

       if(obj.ubicacion !== '' && 
        obj.tipo !=='' &&
        obj.alias!=='' &&
        obj.denominacion !== '' &&
        obj.encargado !== '' &&
        obj.telefono !== '' &&
        obj.comision !== ''
        ){
           swal({
               title: "Estas seguro?",
               text: "La informacion que ingresaste es correcta?",
               type: "success",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Si, adelante!",
               closeOnConfirm: false
           },
           function(isConfirm){
               if(isConfirm){
                   swal("Guardado!", "Registro exitoso!.", "success");
                   Meteor.call('guardaMaquina',obj);
                   Materialize.toast('Registro Guardado!', 4000);
               }

           });
       }else{
        swal({
           title: "Error !",
           text: "Debes llenar todos los campos",
           type: "warning",
           closeOnConfirm: false
        });
       }

   }
});

Template.consulta.helpers({
   'maquinitas':function(){
       return Maquinitas.find();
   } 
});



Template.contadores.events({
   'change #selectContadores':function(evt){
      var idMaquinita = $('#selectContadores').val();
       Session.set('maquinita',idMaquinita); 
   }
});

Template.contadores.helpers({
    'maquinitas':function(){
        return Maquinitas.find();
    },
    'seleccionMaquinita':function () {
       var maquinita = Session.get('maquinita');
        if(maquinita !== '') {
            return true;
        }
        return false;
    }
});
Template.formContadores.rendered = function(){
    //limpiaFormularioContadores();
    // Session.set('totalCliente','');
    // Session.set('recaudado','');
    // Session.set('totalRecaudado','');
    // Session.set('salida','');
    // Session.set('entrada','');
    //Session.set('maquinita','');
};
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
    // $('#contadorEntrada').blur();
    $('#contadorSalida').val('');
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
