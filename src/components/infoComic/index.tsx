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
    title: string,
    fullName: string,
    id: number,
    description: string,
    resourceURI: string,
}

export default function InfoComic(): JSX.Element {
    const [size, setSize] = useState([1366, 768]);
    const [data, setData] = useState<InfoComicProps>();
    const [creators, setCreators] = useState([]);
    const [imagemSrc, setImagemSrc] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
    const [idCharacter, setIdCharacter] = useState(-1);
    const [newLimit, setNewLimit] = useState();
    const [characters, setCharacters] = useState([]);

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

    function getComcic(id: number) {
        try{
            api.get(`/comics/${id}`)
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

    function getCharacterByComicId(id: number) {
        try{
            api.get(`/comics/${id}/characters`, {
                params: {
                    limit: 100,
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

    function getCreatorsByComicId(id: number) {
        try{
            api.get(`/comics/${id}/creators`, {
                params: {
                    limit: 40,
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
            const idComic = JSON.parse(localStorage?.getItem('id-comic') || '');
            getComcic(idComic);
            getCharacterByComicId(idComic);
            getCreatorsByComicId(idComic);
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
            {
                !data ? (
                    <LoaderIndicator />
                ) : (
                    <>
                        <div className={size[0] > 720 ? styles.divHeader : styles.divHeaderResponsive}>
                            <header>
                                <h1>
                                    {data?.title}
                                </h1>
                            </header>
                        </div>
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
                        <h2 className={styles.textLists}>Personagens: </h2>
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
                                                                    localStorage.setItem('back-id-comic', JSON.stringify(data?.id));
                                                                    localStorage.removeItem('id-comic');
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
                                    : (
                                        <h3>Nenhum Encontrado...</h3>
                                    )
                                }
                            </div>
                        </div>
                        <h2 className={styles.textLists}>Alguns dos Criadores: </h2>
                        <div className={creators?.length === 0 ? styles.containerCreatorsResponsive : styles.containerCreators}>
                            <div className={styles.containerCreatorsList}>
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
                                                                <div className={styles.containerSingleCreator}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageCreator : styles.imageCreatorResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={300}
                                                                            alt={item?.title}
                                                                        />
                                                                        <div className={styles.containerTitleCreator}>
                                                                            <p className={styles.titleCreator}>{item?.fullName}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : (
                                        <h3>Nenhum Encontrado...</h3>
                                    )
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
                                                localStorage.removeItem('id-comic');
                                                localStorage.setItem('back-id-comic', JSON.stringify(data?.id));
                                            }}
                                        >
                                            <p>Voltar para o Personagem</p>
                                        </button>
                                    </a>
                                ) : null
                            }
                            <a href={`/?page=comics`}>
                                <button
                                    className={styles.backButton}
                                    onClick={() => {
                                        localStorage.removeItem('back-id-character');
                                        localStorage.removeItem('id-comic');
                                    }}
                                >
                                    <p>Voltar para Comics</p>
                                </button>
                            </a>
                        </div>
                    </>
                )
            }
        </>
    )
}
