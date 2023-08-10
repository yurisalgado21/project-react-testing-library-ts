import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('3. Teste o componente <FavoritePokemon.tsx />', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', async () => {
    const { user } = renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(linkFavoritePokemon);
    expect(screen.getByText(/no favorite pokémon found/i)).toBeInTheDocument();
  });
  test('São exibidos na tela apenas os Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    await user.click(linkMoreDetails);
    const checkboxFavoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    await user.click(checkboxFavoritePokemon);
    const linkFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(linkFavoritePokemon);
    // expect(screen.getByText(/no favorite pokémon found/i)).not.toBeInTheDocument();
    expect(screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    })).toBeInTheDocument();
  });
});
