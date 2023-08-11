import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.tsx />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', async () => {
    const { user } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    await user.click(linkMoreDetails);
    const namePokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(namePokemonDetails).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    )).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', async () => {
    const { user } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    await user.click(linkMoreDetails);
    const namePokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    })).toBeInTheDocument();
    const textLocationPokemonPikachu = 'Pikachu location';
    const locationPokemon = screen.getAllByAltText(textLocationPokemonPikachu);
    expect(locationPokemon).toHaveLength(2);
    expect(locationPokemon[0]).toBeInTheDocument();
    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(locationPokemon[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationPokemon[0]).toHaveAttribute('alt', textLocationPokemonPikachu);

    expect(locationPokemon[1]).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
    expect(locationPokemon[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationPokemon[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes:', async () => {
    const { user } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    await user.click(linkMoreDetails);
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    await user.click(checkbox);
    const imgPokemonFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(imgPokemonFavorite).toBeInTheDocument();
    await user.click(checkbox);
    expect(imgPokemonFavorite).not.toBeInTheDocument();
    expect(screen.getByLabelText(/pokémon favoritado\?/i)).toBeInTheDocument();
  });
});
