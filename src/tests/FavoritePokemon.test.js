import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Testa o componente FavoritePokemon', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const favoritePokemon = screen.getByRole('heading', { name: /favorite pokémon/i });
    expect(favoritePokemon).toBeInTheDocument();

    const notFound = screen.getByText(/no favorite pokémon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
    // renderWithRouter(<FavoritePokemon />);
    renderWithRouter(<App />);
    // const favoritePokemon = screen.getByRole('heading', { name: /favorite pokémon/i });
    // expect(favoritePokemon).toBeInTheDocument();

    // const notFound = screen.getByText(/no favorite pokémon found/i);
    // expect(notFound).toBeInTheDocument();

    // const homeButton = screen.getByRole('link', { name: /home/i });
    // expect(homeButton).toBeInTheDocument();
    // userEvent.click(homeButton);

    // const eletricClass = screen.getByRole('button', { name: /electric/i });
    // expect(eletricClass).toBeInTheDocument();
    // userEvent.click(eletricClass);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pokemonSummary = screen.getByRole('heading', { name: /summary/i });
    const pokemonSummaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    expect(pokemonSummary && pokemonSummaryText).toBeInTheDocument();

    const favCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favCheckBox).toBeInTheDocument();
    userEvent.click(favCheckBox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
  });
});
