/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
//import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import api from '../../services/api';
import { baseURL } from '../../config/consts';
import styled from 'styled-components';

type CharacterProps = {
    thumbnail: {
        path: string,
        extension: string,
    },
    title: string,
    id: number,
    description: string,
}

type ThisProps = {
    id: number,
}

export default function Character({id}: ThisProps): JSX.Element {
    const [data, setData] = useState<CharacterProps>();
    const [imageComic, setImageComic] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
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

    function getComicById(id: number) {
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

    useEffect(() => {
        getComicById(id);
    }, []);

    useEffect(() => {
        setImageComic(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data]);

    return(
        <>  
            <a
                className={styles.clickImage}
                href={`/?page=info-comic`}
                onClick={() => {
                    localStorage.setItem('link-comic', JSON.stringify(baseURL + "/comics/" + data?.id));
                }}
            >
                {  
                    size[0] > 720 ? (
                        <ContainerComics>
                            <div id="containerImage" className={styles.containerImage}>
                                <img
                                    id="image" 
                                    className={styles.image}
                                    src={imageComic} 
                                />
                                <div>
                                    <h2 className={styles.titleComic}>{data?.title}</h2>
                                </div>
                                <div className={styles.containerInformations}>
                                    <p className={styles.description}> {data?.description} </p>
                                </div>
                            </div>
                        </ContainerComics>
                    ) : (
                        <div className={styles.container}>
                            <div id="containerImage" className={styles.containerImage}>
                                <img
                                    id="image" 
                                    className={styles.image}
                                    src={imageComic} 
                                />
                                <div>
                                    <h2 className={styles.titleComic}>{data?.title}</h2>
                                </div>
                            </div>
                        </div>
                    )
                }
            </a>
        </>
    );
}

const ContainerComics = styled.div`
    border-radius: 30px;
    padding: 5px;
    background-color: white;
    width: 280px;
    height: 380px;
    max-width: 300px;
    max-height: 380px;
    margin: 5px;
    overflow: hidden;
    color: black;

    &:hover {
        div#containerImage {
            height: 100px;
            transition: all 1s;
        }
        div#containerImage img {
            height: 100px;
            transition: all 1s;
        }
    }
`;