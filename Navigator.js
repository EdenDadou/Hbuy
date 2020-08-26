import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Connexion from './Components/User/Connexion';
import Register from './Components/User/Register';
import News from './Components/Views/News';
import Horses from './Components/Views/Horses';
import Annonces from './Components/Views/Annonces';
import Contact from './Components/Views/Contact';
import Favoris from './Components/Views/Favoris';
import _HorseView from './Components/Views/Elements/Horses/_HorseView';
import _NewsView from './Components/Views/Elements/News/_NewsView';
import _AnnoncesView from './Components/Views/Elements/Annonces/_AnnoncesView';

const Navigator = createSwitchNavigator({
  Horses: Horses,
  Connexion: Connexion,
  Register: Register,
  News: News,
  NewsView: _NewsView,
  HorseView: _HorseView,
  Annonces: Annonces,
  AnnoncesView: _AnnoncesView,
  Contact: Contact,
  Favoris: Favoris
});

export default createAppContainer(Navigator);