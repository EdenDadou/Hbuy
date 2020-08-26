import axios from 'axios';
import { URL } from './config';

//Fonctionne OK
export const isFavorite = (id_user, id_horse) => {
  let userInfo = JSON.stringify({ id_user: id_user, id_horse: id_horse })
  const PromiseResponse = axios.post(URL + 'isFavorite.php', userInfo)
  return PromiseResponse
}

//Fonctionne OK
export const addFavorite = (id_user, id_horse) => {
  let userInfo = JSON.stringify({ id_user: id_user, id_horse: id_horse })
  const PromiseResponse = axios.post(URL + 'addFavorite.php', userInfo)
  return PromiseResponse
}

//Fonctionne OK
export const deleteFavorite = (id_user, id_horse) => {
  let userInfo = JSON.stringify({ id_user: id_user, id_horse: id_horse })
  const PromiseResponse = axios.post(URL + 'deleteFavorite.php', userInfo)
  return PromiseResponse
}


//Fonctionne OK
export const getFavorisHorses = (id_user) => {
  let userInfo = JSON.stringify({ id_user: id_user})
  const PromiseResponse = axios.post(URL + 'getFavorisHorses.php', userInfo)
  return PromiseResponse
}


export const askInfoHorse = (id_user, id_horse, demande) => {
  let userInfo = JSON.stringify({ id_user: id_user, id_horse: id_horse, demande: demande })
  const PromiseResponse = axios.post(URL + 'askInfoHorse.php', userInfo)
  return PromiseResponse
}

//Fonctionne OK
export const incrementView = (id_horse) => {
  let IdHorse = JSON.stringify({ id_horse: id_horse })
  const PromiseResponse = axios.post(URL + 'incrementView.php', IdHorse)
  return PromiseResponse
}


//Fonctionne OK
export const mostView = () => {
  const PromiseResponse = axios.get(URL + 'mostView.php')
  return PromiseResponse
}

//Fonctionne OK
export const mostRecent = () => {
  const PromiseResponse = axios.get(URL + 'mostRecent.php')
  return PromiseResponse
}


export const getFiltredHorse = (size, age, gender, price, type) => {
  let FilterParam = JSON.stringify({ size: size, age: age, sex: gender, price: price, type: type })
  const PromiseResponse = axios.post(URL + 'getFiltredHorses.php', FilterParam)
  return PromiseResponse
}

//Fonctionne OK
export const getHorse = () => {
  const PromiseResponse = axios.get(URL + 'getHorse.php')
  return PromiseResponse
}

