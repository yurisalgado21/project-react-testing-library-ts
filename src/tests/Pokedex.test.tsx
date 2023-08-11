import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const headingEncounteredPokemon = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(headingEncounteredPokemon).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const btnProximoPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnProximoPokemon).toBeInTheDocument();
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    const { user } = renderWithRouter(<App />);
    const btnProximoPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista.', async () => {
    const { user } = renderWithRouter(<App />);
    const btnProximoPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    await user.click(btnProximoPokemon);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', async () => {
    const { user } = renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    await user.click(buttonNextPokemon);
    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />);
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    buttonFilter.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo.', async () => {
    const { user } = renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });
    await user.click(buttonFire);
    const paragraphPokemonType = screen.getByTestId('pokemon-type');
    expect(paragraphPokemonType).toBeInTheDocument();
  });
  test('O texto do botão deve corresponder ao nome do tipo, ex.: Psychic.', async () => {
    const { user } = renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });
    const buttonFireText = buttonFire.textContent;
    await user.click(buttonFire);
    const paragraphPokemonType = screen.getByTestId('pokemon-type');
    const paragraphPokemonTypeText = paragraphPokemonType.textContent;
    expect(buttonFireText).toEqual(paragraphPokemonTypeText);
  });
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
  test('O texto do botão deve ser All.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    const buttonAllText = buttonAll.textContent;
    expect(buttonAllText).toBe('All');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', async () => {
    const { user } = renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
    const secondPokemon = screen.getByRole('button', { name: /fire/i });
    await user.click(secondPokemon);
    const namePokemon = screen.getByText(/charmander/i);
    expect(namePokemon).toBeInTheDocument();
    await user.click(resetButton);
    const primaryPokemon = screen.getByText(/pikachu/i);
    expect(primaryPokemon).toBeInTheDocument();
  });
});
