const { Contato, buscaPorId } = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}

exports.register = async(req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();
    
        if(contato.errors.length > 0 ){
            req.flash('errors', contato.errors); //mostra o erro
            req.session.save(function(){
                res.redirect('/contato/index');
            });
    
            return;
        }

        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(function(){ 
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });
    }
    catch(e){
        console.log(e);
        return res.render('404');
    }
    
};

exports.editIndex = async(req, res) => {
    if(!req.params.id) return res.render('404');

    try{
        const contato = await buscaPorId(req.params.id);
        res.render('contato', { contato });
    }
    catch{
        console.log(e);
        res.render('404');
    }
};