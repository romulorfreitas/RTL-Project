import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonFound = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(pokemonFound).toBeInTheDocument();
  });
  describe('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado.', () => {
    it('Testa se o botão deve conter o texto Próximo Pokémon', () => {
      renderWithRouter(<App />);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemon).toBeInTheDocument();
    });
    it('Testa se os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
      renderWithRouter(<App />);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const caterpie = screen.getByText(/caterpie/i);
      expect(caterpie).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const ekans = screen.getByText(/ekans/i);
      expect(ekans).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const alakazam = screen.getByText(/alakazam/i);
      expect(alakazam).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const mew = screen.getByText(/mew/i);
      expect(mew).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const rapidash = screen.getByText(/rapidash/i);
      expect(rapidash).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const snorlax = screen.getByText(/snorlax/i);
      expect(snorlax).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const dragonair = screen.getByText(/dragonair/i);
      expect(dragonair).toBeInTheDocument();
    });
    it('Testa se o primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
      renderWithRouter(<App />);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      userEvent.click(nextPokemon);
      expect(pikachu).toBeInTheDocument();
    });
    it('Teste se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<App />);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
    });
  });
  describe('Testa se a Pokédex tem os botões de filtro', () => {
    it('Testa cada botão de filtragem para cada tipo de Pokémon, bem como o botão all', () => {
      renderWithRouter(<App />);
      const allFilterButton = screen.queryAllByTestId('pokemon-type-button');
      const allButton = screen.getByRole('button', { name: /all/i });
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

      const eletricButton = allFilterButton[0];
      expect(eletricButton).toBeInTheDocument();
      userEvent.click(eletricButton);
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      expect(nextPokemon).toHaveProperty('disabled', true);

      const fireButton = allFilterButton[1];
      expect(fireButton).toBeInTheDocument();
      userEvent.click(fireButton);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const rapidash = screen.getByText(/rapidash/i);
      expect(rapidash).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();

      const bugButton = allFilterButton[2];
      expect(bugButton).toBeInTheDocument();
      userEvent.click(bugButton);
      const caterpie = screen.getByText(/caterpie/i);
      expect(caterpie).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      expect(nextPokemon).toHaveProperty('disabled', true);

      const poisonButton = allFilterButton[3];
      expect(poisonButton).toBeInTheDocument();
      userEvent.click(poisonButton);
      const ekans = screen.getByText(/ekans/i);
      expect(ekans).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      expect(nextPokemon).toHaveProperty('disabled', true);

      const psychicButton = allFilterButton[4];
      expect(psychicButton).toBeInTheDocument();
      userEvent.click(psychicButton);
      const alakazam = screen.getByText(/alakazam/i);
      expect(alakazam).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const mew = screen.getByText(/mew/i);
      expect(mew).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();

      const normalButton = allFilterButton[5];
      expect(normalButton).toBeInTheDocument();
      userEvent.click(normalButton);
      const snorlax = screen.getByText(/snorlax/i);
      expect(snorlax).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      expect(nextPokemon).toHaveProperty('disabled', true);

      const dragonButton = allFilterButton[6];
      expect(dragonButton).toBeInTheDocument();
      userEvent.click(dragonButton);
      const dragonair = screen.getByText(/dragonair/i);
      expect(dragonair).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      expect(nextPokemon).toHaveProperty('disabled', true);
    });
  });
  describe('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    it('Testa se o texto do botão deve ser All', () => {
      renderWithRouter(<App />);
      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toBeInTheDocument();
    });
    it('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
      renderWithRouter(<App />);
      const allButton = screen.getByRole('button', { name: /all/i });
      userEvent.click(allButton);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextPokemon);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
    });
    it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
      renderWithRouter(<App />);
      const nextPokemon1 = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemon1).toBeInTheDocument();
    });
  });
});
