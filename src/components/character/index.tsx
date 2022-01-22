//import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Image from 'next/image';

type CharacterProps = {
    data: Object;
}

export default function Character({data}: CharacterProps): JSX.Element {
    const imageCharacter = data.thumbnail.path + '.' + data.thumbnail.extension;

    return(
        <>  
            <div className={styles.container}>
                <div>
                    <h2 className={styles.nameCharacter}>{data.name}</h2>
                </div>
                <div className={styles.containerImage}>
                    <button
                        className={styles.clickImage}
                        onClick={() => {}}
                    >
                        <Image
                            loader={() => imageCharacter}
                            src={imageCharacter} 
                            alt={data.name}
                            height={300} 
                            width={300}
                        />
                    </button>
                    <p className={styles.clickForMore}>Clique na imagem para mais informações</p>
                </div>
                <div className={styles.containerInformations}>
                </div>
            </div>
        </>
    );
}