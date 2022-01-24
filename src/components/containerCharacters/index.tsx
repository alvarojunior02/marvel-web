/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import { useEffect, useLayoutEffect, useState } from "react";
import styles from './styles.module.css';
import { baseURL, timestamp, publicKey, hash } from "../../config/consts";
import axios from 'axios';
import api from "../../services/api";
import Image from 'next/image';

import Character from "../character";
import LoaderIndicator from "../loaderIndicator";
import Lupa from '../../../public/images/magnifier.png';

export default function ContainerCharacters(): JSX.Element {

    type DataProps = {
        thumbnail: {
            path: string,
            extension: string,
        },
        name: string,
        id: number,
        description: string,
        comics: {
            available: number,
            items: {
                name: string,
                resourceURI: string,
            },
        },
    }

    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [contador, setContador] = useState(1);
    const [size, setSize] = useState([0, 0]);

    function useWindowSize() {
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
    }

    useWindowSize();

    const handleScrollToTop = () => {
        window?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    const handleScrollToBottom = () => {
        let element = document.getElementById('1');
        window?.scrollTo({
            top: element?.scrollHeight,
            behavior: 'smooth',
        });
    };

    function getCharacters() {
        try {
            api.get('/characters', {
                params: {
                    ts: timestamp,
                    apikey: publicKey,
                    hash: hash,
                }
            })
            .then(response => { 
                setCharacters(response.data.data.results);
            })
            .catch(error => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }

    function moreCharacters(count: number) {
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

    function searchCharacterByName(name: string) {
        try{
            axios.get(
                `${baseURL}/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&name=${name}`,
            )
            .then(response => {    
                console.log(response);
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCharacters();
    }, []);

    return(
        <>
            <div className={styles.search}>
                <input 
                    style={size[0] > 720 ? {width: '400px'} : {width: '70%'}}
                    type="search" 
                    placeholder="Ex: Spider-Man"
                    value={searchTerm}
                    onChange={event => {
                        setSearchTerm(event.target.value);
                    }}
                />
                <button
                    className={styles.buttonSearch}
                    onClick={() => {
                        searchCharacterByName(searchTerm);
                    }}
                >
                    <Image
                        src={Lupa}
                        width="40"
                        height="40"
                    />
                </button>      
            </div>
            <div className={styles.containerButtons}>
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
            <div className={styles.container}>
                <div id="1" className={styles.containerCharacters}>
                    { 
                        characters.length === 0 ?
                            (
                                <LoaderIndicator />
                            )
                        :
                            (   
                            characters
                                .map((data: DataProps) => {
                                    return (
                                        <Character 
                                            id={data?.id}
                                        />
                                    );
                                })
                            )  
                    }
                </div>
            </div>
            <div className={styles.containerButtons}>
                <button
                    disabled={characters.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        handleScrollToTop();
                    }}
                >
                    Inicio
                </button>
                <button
                    disabled={characters.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        moreCharacters(contador);
                        setContador(contador + 1);
                    }}
                >
                    + Personagens
                </button>
            </div>
        </>
    );
}