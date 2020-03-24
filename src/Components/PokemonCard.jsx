import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './PokemonDetail.scss';
import './PokemonCard.scss';

export default function PokemonCard(props) {
    return (
        <div className="pokemon-card" >
            <div className="row">
                <div className="col-md-12">
                    {props.name}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 d-flex  justify-content-left">
                    <button className="type-pill" style={{ fontSize: "20px" }} type="button" onClick={(e) => { props.onClick() }} >Detail</button>
                </div>
                <div className="col-md-6">
                    <FontAwesomeIcon
                        className="likebtn"
                        icon={faHeart}
                        pull="right"
                        fillOpacity={props.isFav ? "1" : "0"}
                        style={{ color: "red", zIndex: 100 }}
                        stroke="black"
                        strokeWidth="10"
                        width="10"
                        onClick={() => props.onFavBtnlick(props.name)} />
                </div>
            </div>
        </div>)
}
