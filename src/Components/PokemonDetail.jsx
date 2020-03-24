import React, { Component } from 'react';
import './PokemonDetail.scss';
class PokemonDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { name: null }
        };
        this.typeColorMap = {
            normal: "#fffffa",
            fighting: "#d12a00",
            flying: "#1cdbe6",
            poison: "#8f28f7",
            ground: "#807e82",
            rock: "#404040",
            bug: "#add624",
            ghost: "#3285e3",
            steel: "#51606b",
            fire: "#db4e16",
            water: "#00a2ff",
            grass: "#00ff2a",
            electric: "#ffee00",
            psychic: "#8800ff",
            ice: "#00ccff",
            dragon: "#ff4000",
            dark: "#454444",
            fairy: "#b958f5",
            unknown: "#fffffa",
            shadow: "#2b1919",
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.modalData) {
            this.setState({
                data: nextProps.modalData
            })
        }
    }
    render() {
        let types, stats, moves;
        if (this.state.data.name) {
            types = this.state.data.types.map(el => {
                return <div className="type-pill" style={{ color: `${this.typeColorMap[el.type.name]}` }}>{el.type.name}</div>
            });
            stats = this.state.data.stats.map(el => {
                return <div className="row">
                    <div className="col-md-2">
                        <p style={{ fontSize: "20px" }}>{el.stat.name}:</p>
                    </div>
                    <div className="col-md-10">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{ width: `${el.base_stat}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{`${el.base_stat}%`}</div>
                        </div>
                    </div>
                </div>
            });
            moves = this.state.data.moves.map((el, i) => {
                debugger
                if (window.innerWidth < 500 && i < 5) {
                    return <li>{el.move.name}</li>
                } else if (window.innerWidth > 500) {
                    return <li>{el.move.name}</li>
                }
            })
        }
        return (<div>
            <img alt="selected pokemon" src={this.state.data.sprite} />
            <h1>{this.state.data.name}</h1>
            <hr></hr>
            <h4>Type(s)</h4>
            {types}
            <hr></hr>
            <h4>Stats</h4>
            {stats}
            <hr></hr>
            <h4>Moves</h4>
            <ul>{moves}</ul>
        </div>)
    }
}

export default PokemonDetail