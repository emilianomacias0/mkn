/**
 * Created by emi on 9/08/16.
 */
Template.formularioRegistro.events({
   'click #boton':function(evt){
       evt.preventDefault();
       swal({
               title: "Estas seguro?",
               text: "You will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false
           },
           function(isConfirm){
               if(isConfirm){
                   swal("Deleted!", "Your imaginary file has been deleted.", "success");
                   Materialize.toast('Registro Guardado!', 4000);
               }

           });
   }
});