/**
 * Created by emi on 9/08/16.
 */

Router.configure({
    layoutTemplate: 'main'
});


Router.route('/',{
    template:'home',
    name:'home'
});

Router.route('registro',{
    template:'registro',
    name:'registro'
});

Router.route('consulta',{
   template:'consulta',
    name:'consulta'
});

Router.route('contadores',{
    template:'contadores',
    name:'contadores'
});