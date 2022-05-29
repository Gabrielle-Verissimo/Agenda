import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contato from './modules/Contato';
import './assets/estilo.css';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const contato = new Contato('.criar-contato');

login.init();
cadastro.init();
contato.init();