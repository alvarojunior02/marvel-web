/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
//import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { baseURL } from '../../config/consts';

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
            <div className={styles.container}>
                <div>
                    <h2 className={styles.titleComic}>{data?.title}</h2>
                </div>
                <div className={styles.containerImage}>
                    <a
                        className={styles.clickImage}
                        href={`/?page=info-comic`}
                        onClick={() => {
                            localStorage.setItem('link-comic', JSON.stringify(baseURL + "/comics/" + data?.id));
                        }}
                    >
                        <Image
                            loader={() => imageComic}
                            unoptimized={true}
                            src={imageComic} 
                            alt={data?.title}
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