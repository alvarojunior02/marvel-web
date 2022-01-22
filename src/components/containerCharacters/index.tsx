import { useEffect, useState } from "react";
import styles from './styles.module.css';
import { baseURL, timestamp, publicKey, hash } from "../../config/consts";
import axios from 'axios';
import api from "../../services/api";

import Character from "../character";
import LoaderIndicator from "../loaderIndicator";

export default function ContainerCharacters(): JSX.Element {
    const [characters, setCharacters] = useState([]);
    const [characterAux, setCharacterAux] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [contador, setContador] = useState(1);

    const handleScrollToTop = () => {
        let element = document.getElementById('1');
        element?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    const handleScrollToBottom = () => {
        let element = document.getElementById('1');
        element?.scrollTo({
            top: element?.scrollHeight,
            behavior: 'smooth',
        });
    };

    function filterCharacters(character: { name: string; }) {
        return(
            character.name.toUpperCase().includes(searchTerm.toUpperCase())
        );
    }

    function getCharacters(type: string) {
        try {
            axios.get(
                `${baseURL}/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`,
            )
            .then(response => {
                if(type === 'inicio') {
                    setCharacters(response.data.data.results);
                    handleScrollToTop();
                } else if (type === '') {
                    setCharacters(response.data.data.results);
                }
            })
            .catch(error => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }

    function moreCharacters(count: number, type: string) {
        try{
            const offset = count*20;
            api.get('/characters', {
                    params: {
                        offset,
                    }
                }
            )
            .then(response => {    
                setCharacters(characters.concat(response.data.data.results));
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCharacters('');
    }, []);

    return(
        <>
            <div className={styles.search}>
                <input 
                    type="search" 
                    placeholder="Pesquisar por nome"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />      
            </div>
            <div className={styles.container}>
                <div id="1" className={styles.containerCharacters}>
                    {console.log(characters)}
                    { 
                        characters.length === 0 ?
                            (
                                <LoaderIndicator />
                            )
                        :
                            (   
                            characters
                                .filter(character => filterCharacters(character))
                                .map((data) => {
                                    return (
                                        <Character 
                                            key={data?.id}
                                            data={data} 
                                        />
                                    );
                                })
                            )  
                    }
                </div>
                <div className={styles.containerButtons}>
                    <button
                        disabled={characters.length === 0 ? true : false}
                        type="button"
                        className={styles.button}
                        onClick={() => {
                            getCharacters('inicio');
                            setContador(1);
                        }}
                    >
                        Inicio
                    </button>
                    <button
                        disabled={characters.length === 0 ? true : false}
                        type="button"
                        className={styles.button}
                        onClick={() => {
                            moreCharacters(contador, 'moreCharacters');
                            setContador(contador + 1);
                        }}
                    >
                        + Personagens
                    </button>
                    <button
                        disabled={characters.length === 0 ? true : false}
                        type="button"
                        className={styles.button}
                        onClick={() => {
                            handleScrollToBottom();
                        }}
                    >
                        Fim
                    </button>
                </div>
            </div>
        </>
    );
}