import React from 'react';
import RandomCocktail from '../src/components/Cocktail/CocktailApi';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <RandomCocktail />
      <Footer />
    </div>
  );
};

export default App;
