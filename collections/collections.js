/**
 * Created by emi on 10/08/16.
 */
Maquinitas = new Mongo.Collection('maquinitas');

Maquinitas.attachSchema(new SimpleSchema({
	ubicacion:{ type: String, label: "Ubicacion" },
	tipo:{ type: String, label: "Tipo" },
	alias:{ type: String, label: "Alias" },
	denominacion:{ type: Number, label: "Denominacion" },
	encargado:{ type: String, label: "Encargado",optional:true },
	telefono:{ type: String, label: "Telefono",optional:true },
	comision:{ type: Number, label: "Comision" },
	creadoPor:{ type: String, label: "",optional:true },
	creadoEl:{ type: Date, label: "" },
}));


Contadores = new Mongo.Collection('contadores');


TabularTables = {};

TabularTables.Contadores = new Tabular.Table({
  name: "Contadores",
  collection: Contadores,
  scrollY:true,
  columns: [
  	{data: "alias", title:"Alias"},
    {data: "fecha", title: "Fecha",render:function(val){return formateaFecha(val)}}, 
    {data: "contadoresEntrada", title:"Contadores Entrada"},   
    {data: "contadoresSalida", title:"Contadores Salida"},
    {data: "totalMoneda", title:"Total monedas"},
    {data: "totalRecaudado", title:"Total recaudado"},
    {data: "totalComision", title:"Total comision"},
    {data: "totalCliente", title:"Total cliente"},
    {data: "totalNeto", title:"Total Neto"},
    // {
    //   data: "lastCheckedOut",
    //   title: "Last Checkout",
    //   render: function (val, type, doc) {
    //     if (val instanceof Date) {
    //       return moment(val).calendar();
    //     } else {
    //       return "Never";
    //     }
    //   }
    // },
    // {data: "summary", title: "Summary"},
    // {
    //   tmpl: Meteor.isClient && Template.bookCheckOutCell
    // }
  ]
});



if(Meteor.isServer){
	Meteor.publish('getMaquinitas',function(){
		var userId = this.userId;
		return Maquinitas.find({creadoPor:userId});
	});
	Meteor.publish('getContadores',function(){
		var userId = this.userId;
		return Contadores.find({creadoEl:userId});
	});
}
if(Meteor.isClient){
	Meteor.subscribe('getMaquinitas');
	Meteor.subscribe('getContadores');
}
