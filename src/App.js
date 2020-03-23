import React, { Component } from 'react';
import MainNavbar from './Components/MainNavbar';
import PokemonList from './Components/PokemonList';
import PokemonCard from './Components/PokemonCard';
import PokemonDetail from './Components/PokemonDetail';

import './App.css';
import './Components/DetailModal.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemonId: undefined,
      pokemons: [],
      limit: 50,
      offset: 0,
      favs: [],
      modalData: null,
    };
    this.loadMore = this.loadMore.bind(this);
    this.requestMaker = this.requestMaker.bind(this);
    this.favBtnClickHandler = this.favBtnClickHandler.bind(this);
    this.onCardDetailClickHandler = this.onCardDetailClickHandler.bind(this);
  }

  async requestMaker(url, params, cb) {
    const data = await fetch(url + '?' + params);
    const dataJson = await data.json();
    cb(dataJson);
  }

  favBtnClickHandler(pokemonName) {
    const cpPokemons = JSON.parse(JSON.stringify(this.state.pokemons));
    const targetIndex = this.state.pokemons.results.findIndex(el => el.name === pokemonName);
    if (cpPokemons.results[targetIndex].isFav) {
      cpPokemons.results[targetIndex].isFav = !cpPokemons.results[targetIndex].isFav;
    } else {
      cpPokemons.results[targetIndex].isFav = true;
    }
    if (this.state.favs.some(el => el === pokemonName)) {
      const cpFavs = JSON.parse(JSON.stringify(this.state.favs));
      const targetIndex = cpFavs.indexOf(pokemonName);
      cpFavs.splice(targetIndex, 1);
      this.setState({
        pokemons: cpPokemons,
        favs: cpFavs,
      })
    } else {
      this.setState(prevState => ({
        pokemons: cpPokemons,
        favs: [...prevState.favs, pokemonName],
      }));
    }
  };

  loadMore() {
    this.setState(prevState => ({
      offset: prevState.offset + prevState.limit
    }), async () => await this.requestMaker('https://pokeapi.co/api/v2/pokemon', `limit=${this.state.limit}&offset=${this.state.offset}`, (data) => {
      const pokemons = JSON.parse(JSON.stringify(this.state.pokemons));
      pokemons.results = [...pokemons.results, ...data.results];
      this.setState({ pokemons: pokemons });
    }))
  };

  componentDidMount() {
    this.requestMaker('https://pokeapi.co/api/v2/pokemon', `limit=${this.state.limit}&offset=${this.state.offset}`, (data) => this.setState({ pokemons: data }));
  }

  async onCardDetailClickHandler(url) {
    this.requestMaker(url, '', (data) => {
      const modalData = {};
      modalData.name = data.name;
      modalData.sprite = data.sprites.front_default;
      modalData.types = data.types;
      modalData.stats = data.stats;
      modalData.moves = data.moves;
      this.setState({
        modalData: modalData,
      });
      const modal = document.getElementById('pokemonDetailModal');
      modal.style.display = "block";
      const span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
    })
  }

  render() {

    let pokemons = null; let loadingMessage = ''; let favouritePokemons = null;
    if (this.state.pokemons.count > 0) {
      pokemons = this.state.pokemons.results.map((el, index) => <PokemonCard
        className="pokemon-card"
        onClick={async () => await this.onCardDetailClickHandler(el.url)}
        name={el.name}
        url={el.url}
        isFav={el.isFav}
        onFavBtnlick={this.favBtnClickHandler} />);
      loadingMessage = this.state.pokemons.results.length !== this.state.pokemons.count ? 'Loading...' : 'Reached to End of the List';
    }
    if (this.state.favs.length > 0) {
      favouritePokemons = this.state.pokemons.results.map((el, index) => {
        if (el.isFav) {
          return <PokemonCard
            className="pokemon-card"
            onClick={async () => await this.onCardDetailClickHandler(el.url)}
            name={el.name}
            url={el.url}
            isFav={el.isFav}
            onFavBtnlick={this.favBtnClickHandler} />
        } else {
          return null
        }
      })
    }

    return (
      <div className="App" id="App">
        {this.state.pokemons.count > 0 ?
          <React.Fragment>
            <MainNavbar titles={['Pokemons', 'My Favourites']}>
              <PokemonList loadMore={() => this.loadMore()} loadingMessage={loadingMessage}>
                {pokemons}
              </PokemonList>
              <PokemonList loadingMessage="" loadMore={() => { }}>
                {favouritePokemons}
              </PokemonList>
            </MainNavbar>
          </React.Fragment>
          :
          <h1>Loading...</h1>
        }
        <div id="pokemonDetailModal" className="modal">
          <div className="modal-content">
            <div className="close">&times;</div>
            <PokemonDetail modalData={this.state.modalData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
