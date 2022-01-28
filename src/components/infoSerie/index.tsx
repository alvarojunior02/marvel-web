/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image'
import styles from './styles.module.css'
import api from '../../services/api';
import LoaderIndicator from '../loaderIndicator';

type InfoComicProps ={
    thumbnail: {
        path: string,
        extension: string,
    },
    title: string,
    id: number,
    description: string,
    characters: {
        available: number,
    },
    comics: {
        available: number,
    }
    creators: {
        available: number;
    }
}

type CharacterType = {
    thumbnail: {
        path: string,
        extension: string,
    },
    name: string,
    id: number,
    description: string,
    comics: {
        available: number,
        items: [
            name: string,
            resourceURI: string,
        ]   
    },
    urls: [
        type: string,
        url: string,
    ],
    resourceURI: string,
}

type ComicType = {
    thumbnail: {
        path: string,
        extension: string,
    },
    title: string;
    fullName: string,
    id: number,
    description: string,
    resourceURI: string,
}

export default function InfoSerie(): JSX.Element {
    const [size, setSize] = useState([1366, 768]);
    const [data, setData] = useState<InfoComicProps>();
    const [characters, setCharacters] = useState([]);
    const [comics, setComics] = useState([]);
    const [creators, setCreators] = useState([]);
    const [imagemSrc, setImagemSrc] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
    const [idCharacter, setIdCharacter] = useState(-1);
    const [newLimit, setNewLimit] = useState();

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

    function getSerie(id: number) {
        try{
            api.get(`/series/${id}`)
                .then(response => {    
                    setData(response.data.data.results[0]);
                })
                .catch(
                    error => console.log(error)
                )
            
        } catch (error) {
            console.log(error);
        }
    }

    function getCharacterBySerieId(id: number) {
        try{
            api.get(`/series/${id}/characters`, {
                params: {
                    limit: data?.characters?.available,
                }
            })
            .then(response => {    
                setCharacters(response.data.data.results);
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    function getComicsBySerieId(id: number) {
        try{
            api.get(`/series/${id}/comics`, {
                params: {
                    limit: data?.comics?.available,
                }
            })
            .then(response => {    
                console.log(response.data.data.results);
                setComics(response.data.data.results);
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    function getCreatorsBySerieId(id: number) {
        try{
            api.get(`/series/${id}/creators`, {
                params: {
                    limit: data?.creators?.available,
                }
            })
            .then(response => {    
                setCreators(response.data.data.results);
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }
    

    function configureLink(item: any) {
        const linkCharacter = item?.thumbnail?.path + '.' + item?.thumbnail?.extension;
        const linkSplit = linkCharacter.split('http');
        const rightLink = linkSplit[1];
        return ("https".concat(rightLink));
    }

    useEffect(() => {
        try {
            const idSerie = JSON.parse(localStorage?.getItem('id-serie') || '');
            getSerie(idSerie);
            getCharacterBySerieId(idSerie);
            getComicsBySerieId(idSerie);
            getCreatorsBySerieId(idSerie);
            const {idCharacter, limit} = JSON.parse(localStorage.getItem('back-id-character') || JSON.parse('-1'));
            setIdCharacter(idCharacter);
            setNewLimit(limit);
        } catch (e) {
            console.log(e);
        }
        
    }, []);

    useEffect(() => {
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data])

    return (
        <>  
        {console.log(data)}
            {
                !data ? (
                    <LoaderIndicator />
                ) : (
                    <>
                        <div className={styles.container}>
                            <div className={styles.body}>
                                <div className={
                                    size[0] > 720 ?
                                        (
                                            styles.container
                                        )
                                    : 
                                        (
                                            styles.container2
                                        )
                                }>
                                    <div className={styles.containerImage}>
                                        <Image
                                            className={styles.image}
                                            loader={() => imagemSrc}
                                            unoptimized={true}
                                            src={imagemSrc} 
                                            alt={data?.title}
                                            height={500} 
                                            width={400}
                                        />
                                    </div>
                                    <div className={styles.containerInfos}>
                                        <h1 className={styles.textName}>Título: {data?.title} </h1>
                                        <p className={styles.textDescription}>
                                            <b>Descrição: </b>
                                            {
                                                data?.description !== '' ?
                                                    (
                                                        ' ' + data?.description
                                                    )
                                                :
                                                    (
                                                        ' *não fornecida'
                                                    )
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>Personagens: </h2>
                        <div className={characters?.length === 0 ? styles.containerCharactersResponsive : styles.containerCharacters}>
                            <div className={styles.containerCharactersList}>
                                {
                                    data?.characters?.available || -1 > 0 ?
                                        (   
                                            characters?.length === 0 ? (
                                                <LoaderIndicator />
                                            ) : (
                                                characters
                                                .map((item: CharacterType) => {
                                                    return (
                                                        <>
                                                            <a 
                                                                href="/?page=info-character"
                                                                onClick={() => {
                                                                    localStorage.setItem('id-character', JSON.stringify({idCharacter: item?.id, limit: 100}));
                                                                    localStorage.setItem('back-id-serie', JSON.stringify(data?.id));
                                                                    localStorage.removeItem('id-comic');
                                                                    localStorage.removeItem('id-event');
                                                                    localStorage.removeItem('back-id-comic');
                                                                    localStorage.removeItem('back-id-character');
                                                                    localStorage.removeItem('back-id-event');
                                                                }}
                                                            >
                                                                <div className={styles.containerSingleCharacter}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageCraracter : styles.imageCraracterResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={200}
                                                                            alt={item?.name}
                                                                        />
                                                                        <div className={styles.containerNameCharacter}>
                                                                            <p className={styles.nameCharacter}>{item?.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : null
                                }
                            </div>
                        </div>
                        <h2>Comics: </h2>
                        <div className={comics?.length === 0 ? styles.containerComicsResponsive : styles.containerComics}>
                            <div className={styles.containerComicsList}>
                                {
                                    data?.comics?.available || -1 > 0 ?
                                        (   
                                            comics?.length === 0 ? (
                                                <LoaderIndicator />
                                            ) : (
                                                comics
                                                .map((item: ComicType, index: number) => {
                                                    return (
                                                        <>
                                                            <a 
                                                                key={index}
                                                                href="/?page=info-comic"
                                                                onClick={() => {
                                                                    localStorage.setItem('id-comic', JSON.stringify(item?.id));
                                                                    localStorage.setItem('back-id-serie', JSON.stringify(data?.id));
                                                                    localStorage.removeItem('id-character');
                                                                    localStorage.removeItem('id-serie');
                                                                    localStorage.removeItem('back-id-character');
                                                                }}
                                                            >
                                                                <div className={styles.containerSingleComic}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageComic : styles.imageComicResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={300}
                                                                            alt={item?.title}
                                                                        />
                                                                        <div className={styles.containerTitleComic}>
                                                                            <p className={styles.titleComic}>{item?.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : null
                                }
                            </div>
                        </div>
                        <h2>Criadores: </h2>
                        <div className={creators?.length === 0 ? styles.containerComicsResponsive : styles.containerComics}>
                            <div className={styles.containerComicsList}>
                                {
                                    data?.creators?.available || -1 > 0 ?
                                        (   
                                            creators?.length === 0 ? (
                                                <LoaderIndicator />
                                            ) : (
                                                creators
                                                .map((item: ComicType) => {
                                                    return (
                                                        <>
                                                            <a 
                                                                onClick={() => {
                                                                    //localStorage.setItem('id-creator', JSON.stringify(item?.id));
                                                                    //localStorage.setItem('back-id-character', JSON.stringify({idCharacter: data?.id, limit: 100}));
                                                                    //localStorage.removeItem('id-character');
                                                                    alert('Ainda nao esta implementado');
                                                                }}
                                                            >
                                                                <div className={styles.containerSingleComic}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageComic : styles.imageComicResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={300}
                                                                            alt={item?.title}
                                                                        />
                                                                        <div className={styles.containerTitleComic}>
                                                                            <p className={styles.titleComic}>{item?.fullName}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : null
                                }
                            </div>
                        </div>
                        <div className={styles.containerButtons}>
                            {
                                idCharacter ? (
                                    <a href={`/?page=info-character`}>
                                        <button
                                            className={styles.backButton}
                                            onClick={() => {
                                                localStorage.setItem('id-character', JSON.stringify({idCharacter, limit: newLimit}));
                                                localStorage.removeItem('back-id-character');
                                                localStorage.removeItem('id-serie');
                                                localStorage.setItem('back-id-serie', JSON.stringify(data?.id));
                                                localStorage.removeItem('id-comic');
                                                localStorage.removeItem('id-event');
                                                localStorage.removeItem('back-id-comic');
                                                localStorage.removeItem('back-id-event');
                                            }}
                                        >
                                            <p>Voltar para o Personagem</p>
                                        </button>
                                    </a>
                                ) : null
                            }
                            <a href={`/?page=events`}>
                                <button
                                    className={styles.backButton}
                                    onClick={() => {
                                        localStorage.removeItem('back-id-character');
                                        localStorage.removeItem('id-event');
                                    }}
                                >
                                    <p>Voltar para Eventos</p>
                                </button>
                            </a>
                        </div>
                    </>
                )   
            }
        </>
    )
}
