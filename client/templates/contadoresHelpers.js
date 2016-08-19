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