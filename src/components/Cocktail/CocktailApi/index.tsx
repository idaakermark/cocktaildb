import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from '../CocktailApi/cocktail.module.scss'

interface Cocktail {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  ingredients: { name: string; measure: string }[];
}

const RandomCocktail: React.FC = () => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchRandomCocktail = async () => {
    try {
      const response = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      );
      const data = response.data.drinks[0];

      const ingredients: { name: string; measure: string }[] = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (ingredient && measure) {
          ingredients.push({ name: ingredient, measure });
        }
      }

      const updatedCocktail: Cocktail = {
        strDrink: data.strDrink,
        strDrinkThumb: data.strDrinkThumb,
        strInstructions: data.strInstructions,
        ingredients,
      };
      setCocktail(updatedCocktail);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchCocktail = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = response.data.drinks;

      if (data) {
        const result = data[0];

        const ingredients: { name: string; measure: string }[] = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = result[`strIngredient${i}`];
          const measure = result[`strMeasure${i}`];
          if (ingredient && measure) {
            ingredients.push({ name: ingredient, measure });
          }
        }

        const updatedCocktail: Cocktail = {
          strDrink: result.strDrink,
          strDrinkThumb: result.strDrinkThumb,
          strInstructions: result.strInstructions,
          ingredients,
        };
        setCocktail(updatedCocktail);
      } else {
        setCocktail(null);
      }
    } catch (error) {
      console.error('Error fetching search-results:', error);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      fetchRandomCocktail();
    } else {
      searchCocktail();
    }
  }, [searchQuery, searchCocktail]);

  const renderCocktail = () => {
    if (!cocktail) {
      return <p>Oops! Our cocktail detective is on vacation. Can you search for something less mysterious?</p>;
    }

    return (
      <div className={styles.cocktail}>
        <h2>{cocktail.strDrink}</h2>
        <img className={styles['cocktail__image']} src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <h3>Instructions:</h3>
        <p className={styles['cocktail__instructionstxt']}>{cocktail.strInstructions}</p>
        {cocktail.ingredients.length > 0 && (
          <div>
            <h3>Ingredients:</h3>
            <ul>
              {cocktail.ingredients.map((ingredient, i) => (
                <li key={i}>
                  {ingredient.measure} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {cocktail.ingredients.length === 0 && (
          <p>No ingredients available.</p>
        )}
      </div>
    );
  };

  return (
    <div className={styles.generate}>
      <div>
        <input className={styles['generate__input']}
          type="text"
          placeholder="Search for cocktails"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles['generate__button']} onClick={searchCocktail}>Search</button>
      </div>
      <button className={styles['generate__button']} onClick={fetchRandomCocktail}>Get me a random cocktail!</button>
      {renderCocktail()}
    </div>
  );
};

export default RandomCocktail;