/**
 * Created by emi on 9/08/16.
 */
 Template.consulta.helpers({
 selectorMaquinita:function(){
  var alias ;
  if(Session.get('aliasMaquinita')!== undefined && Session.get('aliasMaquinita')!==''){
    var alias = Session.get('aliasMaquinita');
  }else{
    alias = '';
  }

  return {alias:alias}
 },
 "maquinitasOptions": function(){

   return obtieneDistintasMaquinitas();
 }
 });
  Template.consulta.events({
 'change #difMAquinitas': function(evt){
   var alias = evt.target.value;
   console.log(alias);
   Session.set('aliasMaquinita',alias);
 }
 });

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
                   limpiaFormularioRegistro();
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
// Template.consulta.onRendered(function(){
//   Session.set('aliasMaquinita','');
// });


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

 Session.set('totalCliente','');
    Session.set('recaudado','');
    Session.set('totalRecaudado','');
    Session.set('salida','');
    Session.set('entrada','');
    Session.set('maquinita','');

