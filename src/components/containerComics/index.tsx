/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import { useEffect, useLayoutEffect, useState } from "react";
import styles from './styles.module.css';
import { baseURL, timestamp, publicKey, hash } from "../../config/consts";
import axios from 'axios';
import api from "../../services/api";
import Image from "next/image";

import LoaderIndicator from "../loaderIndicator";
import Comic from '../comic';
import Lupa from '../../../public/images/magnifier.png';

export default function ContainerComics(): JSX.Element {

    type DataProps = {
        thumbnail: {
            path: string,
            extension: string,
        },
        title: string,
        id: number,
        description: string,
    }

    const [comics, setComics] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [contador, setContador] = useState(2);
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

    /*function filterCharacters(comic: { title: string; }) {
        return(
            comic.title.toUpperCase().includes(searchTerm.toUpperCase())
        );
    }*/

    function getComics() {
        try {
            api.get('/comics', {
                    params: {
                        limit: 40,
                    }
                }
        )
            .then(response => { 
                setComics(response.data.data.results);
            })
            .catch(error => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }

    function moreComics(count: number) {
        try{
            const offset = count*20;
            api.get('/comics', {
                    params: {
                        offset,
                        limit: 40,
                    }
                }
            )
            .then(response => {    
                setComics(comics.concat(response.data.data.results));
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getComics();
    }, []);

    return(
        <>
            {/*<div className={styles.search}>
                <input 
                    style={size[0] > 720 ? {width: '400px'} : {width: '70%'}}
                    type="search" 
                    placeholder="Pesquisar"
                    value={searchTerm}
                    onChange={event => {
                        setSearchTerm(event.target.value);
                    }}
                />    
                </div>*/}
            <div className={styles.divHeader}>
                <header>
                    <h1>
                        COMICS
                    </h1>
                </header>
            </div>
            <div className={styles.containerButtons}>
                <button
                    disabled={comics.length === 0 ? true : false}
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
                <div id="1" className={styles.containerComics}>
                    { 
                        comics.length === 0 ?
                            (
                                <LoaderIndicator />
                            )
                        :
                            (   
                            comics
                                .filter((data: DataProps) => {
                                    return (!data.thumbnail.path.includes("image_not_available"))
                                }) 
                                .map((data: DataProps) => {
                                    return (
                                        <Comic 
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
                    disabled={comics.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        handleScrollToTop();
                    }}
                >
                    Inicio
                </button>
                <button
                    disabled={comics.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        moreComics(contador);
                        setContador(contador + 2);
                    }}
                >
                    + Comics
                </button>
            </div>
        </>
    );
}