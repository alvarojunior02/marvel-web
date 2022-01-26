/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import { useEffect, useLayoutEffect, useState } from "react";
import styles from './styles.module.css';
import api from "../../services/api";

import Creator from "../creator";
import LoaderIndicator from "../loaderIndicator";

export default function ContainerCreators(): JSX.Element {

    type DataProps = {
        thumbnail: {
            path: string,
            extension: string,
        },
        fullName: string,
        id: number,
        comics: {
            available: number,
            items: {
                name: string,
                resourceURI: string,
            },
        },
    }

    const [creators, setCreators] = useState([]);
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

    function getCreators() {
        try {
            api.get('/creators', {
                    params: {
                        limit: 40,
                    }
                }
            )
              .then(response => {
                setCreators(response.data.data.results);
              })
        } catch (err) {
        console.log(err);
        }
    }

    function moreCreators(count: number) {
        try{
            const offset = count*20;
            api.get('/characters', {
                    params: {
                        offset,
                        limit: 40,
                    }
                }
            )
            .then(response => {    
                setCreators(creators.concat(response.data.data.results));
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCreators();
    }, []);

    return(
        <>
            <div className={styles.divHeader}>
                <header>
                    <h1>
                        CRIADORES
                    </h1>
                </header>
            </div>
            <div className={styles.containerButtons}>
                <button
                    disabled={creators?.length === 0 ? true : false}
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
                        creators?.length <= 0 ?
                            (
                                <LoaderIndicator />
                            )
                        :
                            (   
                                creators
                                    .map((data: DataProps) => {
                                        return (
                                            <Creator 
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
                    disabled={creators.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        handleScrollToTop();
                    }}
                >
                    Inicio
                </button>
                <button
                    disabled={creators.length === 0 ? true : false}
                    type="button"
                    className={styles.button}
                    onClick={() => {
                        moreCreators(contador);
                        setContador(contador + 2);
                    }}
                >
                    + Criadores
                </button>
            </div>
        </>
    );
}