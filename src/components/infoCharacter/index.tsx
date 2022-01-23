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

type ItemProps = {
    type: string,
    url: string,
}

export default function InfoCharacter(): JSX.Element {
    const [data, setData] = useState<InfoCharacterProps>();
    const [imagemSrc, setImagemSrc] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
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

    useEffect(() => {
        try {
            const idCharacter = JSON.parse(localStorage?.getItem('id-character') || '');
            getCharacterById(idCharacter);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data])

    return (
        <>
            <div className={styles.container}>
                {console.log(data)}
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
                                loader={() => imagemSrc}
                                unoptimized={true}
                                src={imagemSrc} 
                                alt={data?.name}
                                height={500} 
                                width={500}
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
            <div className={styles.containerComics}>
                <h2>Comics do Personagem: </h2>
                {
                    data?.comics?.available || -1 > 0 ?
                        (
                            data?.comics?.items
                                .map((item: {resourceURI: string, name: string}) => {
                                    return (
                                        <>
                                            <div>
                                                <a 
                                                    href="/?page=info-comic"
                                                    onClick={() => {
                                                        localStorage.setItem('link-comic', JSON.stringify(item?.resourceURI))
                                                    }}
                                                >
                                                    <p>{item?.name}</p> 
                                                </a> 
                                            </div>
                                        </>    
                                    )
                                })
                        )
                    : null
                }
            </div>
            <div className={styles.containerUrls}>
                <h2>URLs Uteis: </h2>
                {
                    data?.urls.length || -1 > 0 ?
                        (
                            data?.urls
                                .map((item: ItemProps) => {
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
                        className={styles.clickImage}
                    >
                        <p>Voltar</p>
                    </button>
                </a>
            </div>
        </>
    )
}
