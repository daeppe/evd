'use client';
import styles from './index.module.css';
import Form from '@/components/form/form';
import Header from '@/components/header/header';
import { useState } from 'react';

export default function Home() {

  const [urlVideo, setUrlVideo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Está aqui', urlVideo);
  };

  return (
    <div className={styles['index']}>
      <Header />
      <Form onSubmit={handleSubmit} urlVideo={urlVideo} setUrlVideo={setUrlVideo} />
      <p>Site para baixar videos do youtube nesses formatos.
        <br />Quanto maior o vídeo for mais tempo requer para começar o download.</p>
    </div>
  );
}
