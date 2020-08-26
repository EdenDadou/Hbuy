import axios from 'axios';
import { URL } from './config';

export const UserLogin = (UserEmail, UserPassword) => {
    let userInfo = JSON.stringify({ email: UserEmail, password: UserPassword})
    const PromiseResponse = axios.post(URL + 'user_login.php', userInfo)
    return PromiseResponse
  }


export const SendFormulaire = (AnnonceComplete) => {
    const PromiseResponse = axios.post(URL + 'Contact.php', AnnonceComplete)
    return PromiseResponse
  }