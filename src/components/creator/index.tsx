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

type ThisProps = {
    id: number,
}

export default function Creator({id}: ThisProps): JSX.Element {
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

    function getCreatorById(id: number) {
        try{
            api.get(`/creators/${id}`)
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
        getCreatorById(id);
    }, []);

    useEffect(() => {
        setImageCharacter(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data]);

    return(
        <>     
            <a
                className={styles.clickImage}
                onClick={() => {
                    localStorage.setItem('id-creator', JSON.stringify(data?.id));
                }}
            >
                {  
                    size[0] > 720 ? (
                        <ContainerCreator>
                            <div id="containerImage" className={styles.containerImage}>
                                <img
                                    id="image" 
                                    className={styles.image}
                                    src={imageCharacter} 
                                />
                                <div>
                                    <h2 className={styles.nameCharacter}>{data?.fullName}</h2>
                                </div>
                            </div>
                        </ContainerCreator>
                    ) : (
                        <div className={styles.container}>
                            <div id="containerImage" className={styles.containerImage}>
                                <img
                                    id="image" 
                                    className={styles.image}
                                    src={imageCharacter} 
                                />
                                <div>
                                    <h2 className={styles.nameCharacter}>{data?.fullName}</h2>
                                </div>
                            </div>
                        </div>
                    )
                }
            </a>
        </>
    );
}

const ContainerCreator = styled.div`
    
    border-radius: 30px;
    padding: 5px;
    width: 280px;
    height: 300px;
    max-width: 280px;
    max-height: 300px;
    margin: 5px;
    overflow: hidden;
    color: black;

    &:hover {
        div#containerImage {
            height: 180px;
            transition: all 0.8s;
        }
        div#containerImage img {
            width: 120px;
            height: 140px;
            transition: all 0.8s;
        }
    }
`;