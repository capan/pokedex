import React, { useEffect } from 'react';
import './PokemonList.scss';

const PokemonList = (props) => {

    useEffect(() => {
        window.addEventListener("scroll", handleOnScroll);
        return () => {
            window.removeEventListener("scroll", handleOnScroll);
        };
    });

    const handleOnScroll = () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        const scrollHeight =
            (document.documentElement && document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        const clientHeight =
            document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom =
            Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            props.loadMore();
        }
        const toTopButton = document.getElementById('toTopBtn');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            toTopButton.style.display = "block";
        } else {
            toTopButton.style.display = "none";
        }
    };

    return (
        <React.Fragment>
            {props.children ?
                <div id="gridContainer" className="grid-container">
                    {props.children.map((el) => el)}
                </div> :
                <h1>When you click favourite button pokemons will appear here!</h1>
            }
            <button onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }} id="toTopBtn" title="Go Top!">Top</button>
            <div id="lazyload">{props.loadingMessage}</div>
        </React.Fragment>
    );
};

export default PokemonList;
