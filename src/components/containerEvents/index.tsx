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
import Event from '../event';
import Lupa from '../../../public/images/magnifier.png';

export default function ContainerEvents(): JSX.Element {

    type DataProps = {
        thumbnail: {
            path: string,
            extension: string,
        },
        title: string,
        id: number,
        description: string,
    }

    const [events, setEvents] = useState([]);
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

    /*function filterEvents(event: { title: string; }) {
        return(
            event.title.includes(searchTerm)
        );
    }*/

    function getEvents() {
        try {
            api.get('/events', {
                    params: {
                        limit: 40,
                    }
                }
        )
            .then(response => { 
                setEvents(response.data.data.results);
            })
            .catch(error => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }

    function moreEvents(count: number) {
        try{
            const offset = count*20;
            api.get('/events', {
                    params: {
                        offset,
                        limit: 40,
                    }
                }
            )
            .then(response => {    
                setEvents(events.concat(response.data.data.results));
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    return(
        <>
            {/*<div className={styles.containerButtons}>
                <button
                    disabled={events.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        handleScrollToBottom();
                    }}
                >
                    Fim
                </button>
            </div>*/}
            <div className={styles.divHeader}>
                <header>
                    <h1>
                        EVENTOS
                    </h1>
                </header>
            </div>
            <div className={styles.containerButtons}>
                <button
                    disabled={events.length === 0 ? true : false}
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
                <div id="1" className={styles.containerEvents}>
                    { 
                        events.length === 0 ?
                            (
                                <LoaderIndicator />
                            )
                        :
                            (   
                                events
                                    .filter((data: DataProps) => {
                                        return (!data.thumbnail.path.includes("image_not_available"))
                                    }) 
                                    .map((data: DataProps) => {
                                        return (
                                            <Event 
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
                    disabled={events.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        handleScrollToTop();
                    }}
                >
                    Inicio
                </button>
                <button
                    disabled={events.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        moreEvents(contador);
                        setContador(contador + 2);
                    }}
                >
                    + Eventos
                </button>
            </div>
        </>
    );
}