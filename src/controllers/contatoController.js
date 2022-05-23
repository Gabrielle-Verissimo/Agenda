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
            res.redirect(`/contato/index/${contato.contato._id}`);
        });
        return;
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

exports.edit = async(req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0 ){
            req.flash('errors', contato.errors); //mostra o erro
            req.session.save(function(){
                res.redirect('/contato/index');
            });
    
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(function(){ 
            res.redirect(`/contato/index/${contato.contato._id}`);
        });
        return;
    }
    catch(e){
        console.log(e);
        res.render('404')
    }

}

exports.deletar = async(req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.deletar(req.params.id);
    
        req.flash('success', 'Contato excluído com sucesso');
        req.session.save(function(){ 
            res.redirect('/');
        });
        return;
    }
    catch(e){
        console.log(e);
        res.render('404')
    }
}