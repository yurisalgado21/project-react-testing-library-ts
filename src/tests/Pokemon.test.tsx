import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.tsx />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByText(/pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });
  test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const paragraphPokemonType = screen.getByTestId('pokemon-type');
    const paragraphPokemonTypeText = paragraphPokemonType.textContent;
    expect(paragraphPokemonTypeText).toBe('Electric');
  });
  test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, em que <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida.', () => {
    renderWithRouter(<App />);
    const avaragePokemon = screen.getByText(/average weight: 6\.0 kg/i);
    const avaragePokemonText = avaragePokemon.textContent;
    expect(avaragePokemonText).toBe('Average weight: 6.0 kg');
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, em que <name> é o nome do Pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonImage = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    const srcPokemonImage = pokemonImage.getAttribute('src');
    const atributeImagePokemon = pokemonImage.getAttribute('alt');
    expect(srcPokemonImage).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(atributeImagePokemon).toBe('Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', async () => {
    renderWithRouter(<App />);
    const linkMoreDetailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetailsPokemon).toHaveAttribute('href', '/pokemon/25');
  });
  test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    const { user } = renderWithRouter(<App />);
    const linkMoreDetailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetailsPokemon).toHaveAttribute('href', '/pokemon/25');
    await user.click(linkMoreDetailsPokemon);
    expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', async () => {
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
    const imgFavoritePokemon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    const srcImgFavoritePokemon = imgFavoritePokemon.getAttribute('src');
    const altImgFavoritePokemon = imgFavoritePokemon.getAttribute('alt');
    expect(srcImgFavoritePokemon).toBe('/star-icon.png');
    expect(altImgFavoritePokemon).toBe('Pikachu is marked as favorite');
  });
});
