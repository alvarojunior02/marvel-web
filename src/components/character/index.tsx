/* eslint-disable @next/next/no-html-link-for-pages */
//import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Image from 'next/image';
import Router from 'next/router';
import { setCookie } from 'nookies';

type CharacterProps = {
    data: {
        thumbnail: {
            path: string,
            extension: string,
        },
        name: string,
        id: number,
    }
}

export default function Character({data}: CharacterProps): JSX.Element {
    const imageCharacter = data?.thumbnail?.path + '.' + data?.thumbnail?.extension;

    return(
        <>  
            <div className={styles.container}>
                <div>
                    <h2 className={styles.nameCharacter}>{data.name}</h2>
                </div>
                <div className={styles.containerImage}>
                    <a
                        className={styles.clickImage}
                        href="/?page=info-characters"
                        onClick={() => {
                            localStorage.setItem('data-character', JSON.stringify(data));
                        }}
                  >
                        <Image
                            loader={() => imageCharacter}
                            src={imageCharacter} 
                            alt={data.name}
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