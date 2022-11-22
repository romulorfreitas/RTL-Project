import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa o componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pokedexInfo = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    expect(pokedexInfo).toBeInTheDocument();
  });
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const fisrtParagraph = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(fisrtParagraph && secondParagraph).toBeInTheDocument();
  });
  it('Testa se a página contém a imagem de uma Pokédex.', async () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByRole('img', { name: /pokédex/i });
    const pokedexImageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexAlt = 'Pokédex';

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toBe(pokedexImageLink);
    expect(pokedexImage.alt).toBe(pokedexAlt);
  });
});
