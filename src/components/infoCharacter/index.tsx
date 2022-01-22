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
    dataCharacter: Object;
}

export default function InfoCharacter({dataCharacter}: InfoCharacterProps): JSX.Element {
    const [data, setData] = useState(null);
    const [imagemSrc, setImagemSrc] = useState('');

    useEffect(() => {        
        setData(JSON.parse(localStorage?.getItem('data-character')));
    }, []);

    useEffect(() => {
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                {console.log(data)}
                {
                    data === null ? 
                        (
                            <LoaderIndicator />
                        )
                    :
                        (
                            <>
                                <div className={styles.container}>
                                    <div className={styles.containerImage}>
                                        <Image
                                            loader={() => imagemSrc}
                                            src={imagemSrc} 
                                            alt={data.name}
                                            height={500} 
                                            width={500}
                                        />
                                    </div>
                                    <div className={styles.containerInfos}>
                                        <h1 className={styles.textName}>Nome: {data.name} </h1>
                                        <p className={styles.textDescription}>
                                            Descrição: 
                                            {
                                                data.description !== '' ?
                                                    (
                                                        ' ' + data.description
                                                    )
                                                :
                                                    (
                                                        ' *não fornecida'
                                                    )
                                            }
                                        </p>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    )
}
