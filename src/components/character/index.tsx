/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
//import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import api from '../../services/api';
import styled from 'styled-components';

type CharacterProps = {
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

type ThisProps = {
    id: number,
}

export default function Character({id}: ThisProps): JSX.Element {
    const [data, setData] = useState<CharacterProps>();
    const [size, setSize] = useState([0, 0]);
    const [imageCharacter, setImageCharacter] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');

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
        getCharacterById(id);
    }, []);

    useEffect(() => {
        setImageCharacter(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data]);

    return(
        <>     
            <a
                className={styles.clickImage}
                href={`/?page=info-character`}
                onClick={() => {
                    localStorage.setItem('id-character', JSON.stringify(data?.id));
                }}
            >
                {  
                    size[0] > 720 ? (
                        <ContainerCharacter>
                            <div id="containerImage" className={styles.containerImage}>
                                <img
                                    id="image" 
                                    className={styles.image}
                                    src={imageCharacter} 
                                />
                                <div>
                                    <h2 className={styles.nameCharacter}>{data?.name}</h2>
                                </div>
                                <div className={styles.containerInformations}>
                                    <p className={styles.description}> {data?.description} </p>
                                </div>
                            </div>
                        </ContainerCharacter>
                    ) : (
                        <div className={styles.container}>
                            <div id="containerImage" className={styles.containerImage}>
                                <img
                                    id="image" 
                                    className={styles.image}
                                    src={imageCharacter} 
                                />
                                <div>
                                    <h2 className={styles.nameCharacter}>{data?.name}</h2>
                                </div>
                            </div>
                        </div>
                    )
                }
            </a>
        </>
    );
}

const ContainerCharacter = styled.div`
    border: 2px solid black;
    border-radius: 30px;
    padding: 5px;
    background-color: #ec1d24;
    width: 280px;
    height: 300px;
    max-width: 280px;
    max-height: 300px;
    margin: 5px;
    overflow: hidden;
    color: white;

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