/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
//import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '../../services/api';

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
    const [imageCharacter, setImageCharacter] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');

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
            <div className={styles.container}>
                <div>
                    <h2 className={styles.nameCharacter}>{data?.name}</h2>
                </div>
                <div className={styles.containerImage}>
                    <a
                        className={styles.clickImage}
                        href={`/?page=info-character`}
                        onClick={() => {
                            localStorage.setItem('id-character', JSON.stringify(data?.id));
                        }}
                    >
                        <Image
                            loader={() => imageCharacter}
                            unoptimized={true}
                            src={imageCharacter} 
                            alt={data?.name}
                            height={300} 
                            width={300}
                        />
                    </a>
                    <p className={styles.clickForMore}>Clique na imagem para mais informações</p>
                </div>
                <div className={styles.containerInformations}>
                </div>
            </div>
        </>
    );
}