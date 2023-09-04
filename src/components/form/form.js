import styles from './form.module.css';
import Button from '../button/button';
import Input from '../input/input';
import { useState } from 'react';

const Form = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const setUrlVideo = props.setUrlVideo;
    const urlVideo = props.urlVideo;

    const handleSubmit = (event) => {
        urlVideo && setIsLoading(!isLoading);
        event.preventDefault();
    };

    const handlerUrl = (event) => {
        setUrlVideo(event.target.value);
    };

    const videoInfo = async (urlVideo) => {
        const response = await fetch(`api/videoinfos?url=${urlVideo}`, {});
        const data = await response.json();
        const title = data.videoDetails.title;
        return title;
    };

    const videoDownloader = (urlVideo, videoExt) => {
        fetch(`api/videodownloader?url=${urlVideo}&ext=${videoExt}`, {
        }).then(response => {
            response.blob().then(async blob => {
                const title = await videoInfo(urlVideo);
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = `${title}.${videoExt}`;
                a.click();
                setIsLoading(false);
            });
        });
    };
    return <form onSubmit={handleSubmit} className={styles['form']}>
        <Input type='text' onChange={(event) => handlerUrl(event)} placeholder='Coloque o link do vídeo aqui!' />
        <div>
            <Button type="submit" onClick={() => videoDownloader(urlVideo, 'mp4')} isLoading={isLoading}>MP4</Button>
            <Button type="submit" onClick={() => videoDownloader(urlVideo, 'mov')} isLoading={isLoading}>MOV</Button>
            <Button type="submit" onClick={() => videoDownloader(urlVideo, 'mp3')} isLoading={isLoading}>MP3</Button>
        </div>
    </form>;
};

export default Form;