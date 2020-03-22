import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './PokemonCard.scss';

export default function PokemonCard(props) {
    return (
        <div className="pokemon-card" onDoubleClick={(e) => { debugger; props.onClick() }}>
            {props.name}
            <span>
                <FontAwesomeIcon
                    className="likebtn"
                    icon={faHeart}
                    pull="left"
                    fillOpacity={props.isFav ? "1" : "0"}
                    style={{ color: "red", zIndex: 100 }}
                    stroke="black"
                    strokeWidth="10"
                    width="10"
                    onClick={() => props.onFavBtnlick(props.name)} />
            </span>
        </div>)
}
