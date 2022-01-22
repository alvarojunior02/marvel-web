/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link';
import styles from './styles.module.css'
import marvelLogo from '../../public/images/marvel-background.png';
import LoaderIndicator from '../../components/loaderIndicator';

type InfoCharacterProps = {
    
    thumbnail: {
        path: string,
        extension: string,
    },
    name: string,
    id: number,
    description: string,
}


export default function InfoCharacter(): JSX.Element {
    const [data, setData] = useState<InfoCharacterProps>();
    const [imagemSrc, setImagemSrc] = useState('');

    useEffect(() => {    
        const newData = JSON.parse(localStorage?.getItem('data-character') || '');
        setData(newData);
    }, []);

    useEffect(() => {
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.container}>
                     <div className={styles.containerImage}>
                        <Image
                            loader={() => imagemSrc}
                            src={imagemSrc} 
                            alt={data?.name}
                            height={500} 
                            width={500}
                        />
                    </div>
                    <div className={styles.containerInfos}>
                        <h1 className={styles.textName}>Nome: {data?.name} </h1>
                        <p className={styles.textDescription}>
                            Descrição: 
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
    )
}
