$(function () {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval: 5000
    });

    $('#contacto').on('show.bs.modal', function (e){
        console.log('El modal contacto se está mostrando');
    //el on en JQuery siempre se utiliza para subscribir un evento. 
        $('[data-target="#contacto"]').removeClass('btn-outline-primary');
        $('[data-target="#contacto"]').addClass('btn-outline-success'); /*Esto lo que va a hacer, es quitar la clase de cada elemento que tenga el atributo determinado valor con removeClass(). En este caso es data-target="#contacto". Y a gregarle otro con addClass()*/
        //$('[data-target="#contacto"]').prop('disabled', true); //Aquí le decimos que deshabilitamos lo anterior cada vez que se desabilite elvento correspondiente. A mi no me funcionó.
    });
    $('#contacto').on('shown.bs.modal', function (e){
        console.log('El modal contacto se mostró');
        
    });
    $('#contacto').on('hide.bs.modal', function (e){
        console.log('El modal contacto se está ocultando');
    });
    $('#contacto').on('hidden.bs.modal', function (e){
        console.log('El modal contacto se ocultó');
        $('[data-target="#contacto"]').removeClass('btn-outline-success');
        $('[data-target="#contacto"]').addClass('btn-outline-primary'); //Esto funcionaría como el $('[data-target="#contacto"]').prop('disabled', true); del primer evento del modal. 
    });


});


