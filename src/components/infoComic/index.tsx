/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image'
import styles from './styles.module.css'
import { baseURL, timestamp, publicKey, hash } from "../../config/consts";
import axios from 'axios';
import api from '../../services/api';

type InfoComicProps ={
    thumbnail: {
        path: string,
        extension: string,
    },
    title: string,
    id: number,
    description: string,
}

export default function InfoComic(): JSX.Element {
    const [size, setSize] = useState([1366, 768]);
    const [data, setData] = useState<InfoComicProps>();
    const [imagemSrc, setImagemSrc] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');

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

    function getComcisByLink(link: string) {
        try{
            
            axios.get(`${link}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
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
            const linkComic = JSON.parse(localStorage?.getItem('link-comic') || '');
            getComcisByLink(linkComic);
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
                                alt={data?.title}
                                height={500} 
                                width={500}
                            />
                        </div>
                        <div className={styles.containerInfos}>
                            <h1 className={styles.textName}>Nome: {data?.title} </h1>
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
            <div className={styles.containerButtons}>
                <a href={`/?page=info-character`}>
                    <button
                        className={styles.clickImage}
                    >
                        <p>Voltar para Personagem</p>
                    </button>
                </a>
                <a href={`/?page=comics`}>
                    <button
                        className={styles.clickImage}
                    >
                        <p>Voltar para Comics</p>
                    </button>
                </a>
            </div>
        </>
    )
}
