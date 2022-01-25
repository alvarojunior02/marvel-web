/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from './styles.module.css'
import { baseURL, timestamp, publicKey, hash } from "../../config/consts";
import axios from 'axios';
import api from '../../services/api';
import { type } from 'os';
import LoaderIndicator from '../loaderIndicator';

type InfoCharacterProps = {
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
    ]
}

type ComicType = {
    thumbnail: {
        path: string,
        extension: string,
    },
    title: string,
    id: number,
    description: string,
    resourceURI: string,
}

export default function InfoCharacter(): JSX.Element {
    const [data, setData] = useState<InfoCharacterProps>();
    const [comics, setComics] = useState([]);
    const [imagemSrc, setImagemSrc] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
    const [imageComic, setImageComic] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
    const [size, setSize] = useState([1366, 768]);

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

    function getCharacterById(id: number) {
        try{
            api.get(`/characters/${id}`)
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

    function getComicsByCharacter(id: number, limit: number) {
        try{
            api.get(`/characters/${id}/comics`, {
                params: {
                    limit,
                }
            })
            .then(response => {    
                setComics(response.data.data.results)
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    function configureLink(item: ComicType) {
        const linkComic = item?.thumbnail?.path + '.' + item?.thumbnail?.extension;
        const linkSplit = linkComic.split('http');
        const rightLink = linkSplit[1];
        return ("https".concat(rightLink));
    }

    useEffect(() => {
        try {
            const {idCharacter, limit} = JSON.parse(localStorage?.getItem('id-character') || '');
            getCharacterById(idCharacter);
            getComicsByCharacter(idCharacter, 100);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data]);

    return (
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
                                alt={data?.name}
                                height={400} 
                                width={400}
                            />
                        </div>
                        <div className={styles.containerInfos}>
                            <h1 className={styles.textName}>Nome: {data?.name} </h1>
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
            <h2>Comics do Personagem: </h2>
            <div className={comics?.length === 0 ? styles.containerComicsResponsive : styles.containerComics}>
                <div className={styles.containerComicsList}>
                    {
                        data?.comics?.available || -1 > 0 ?
                            (   
                                comics?.length === 0 ? (
                                    <LoaderIndicator />
                                ) : (
                                    comics
                                    .map((item: ComicType) => {
                                        return (
                                            <>
                                                <a 
                                                    href="/?page=info-comic"
                                                    onClick={() => {
                                                        localStorage.setItem('link-comic', JSON.stringify(item?.resourceURI));
                                                        localStorage.setItem('back-id-character', JSON.stringify({idCharacter: data?.id, limit: data?.comics?.available}));
                                                    }}
                                                >
                                                    <div className={styles.containerSingleComic}>
                                                        <div className={styles.containerImage}>                                                  
                                                            <img
                                                                className={styles.imageComic}
                                                                src={configureLink(item)} 
                                                                width={200}
                                                                height={300}
                                                            />
                                                            <div>
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
            <div className={styles.containerUrls}>
                <h2>URLs Uteis: </h2>
                {
                    data?.urls.length || -1 > 0 ?
                        (
                            data?.urls
                                .map((item: any) => {
                                    return (
                                        <>
                                            <div>
                                                <a target='_blank' href={item?.url} rel="noreferrer">
                                                    <p>{item?.type.toUpperCase()}</p>
                                                </a>
                                            </div>
                                        </>    
                                    )
                                })
                        )
                    : null
                }
            </div>
            <div className={styles.containerButtons}>
                <a href={`/?page=characters`}>
                    <button
                        className={styles.backButton}
                        onClick={() => {
                            localStorage.removeItem('link-comic');
                            localStorage.removeItem('back-character');
                        }}
                    >
                        <p>Voltar</p>
                    </button>
                </a>
            </div>
        </>
    )
}
