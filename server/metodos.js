/**
 * Created by emi on 10/08/16.
 */


Meteor.methods({
    'guardaMaquina':function(obj){
        obj.creadoPor = this.userId;
        obj.creadoEl=new Date();
        Maquinitas.insert(obj);

    },
    'guardaContadores':function(obj){
    	obj.creadoPor = this.userId;
    	obj.creadoEl = new Date();
    	Contadores.insert(obj);
    }
});