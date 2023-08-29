import styles from './form.module.css';
import Button from '../button/button';
import Input from '../input/input';

const Form = (props) => {
    const onSubmit = props.onSubmit;
    const setUrlVideo = props.setUrlVideo;
    const urlVideo = props.urlVideo;

    const handlerUrl = (event) => {
        setUrlVideo(event.target.value);
        console.log(urlVideo);
    };

    const videoInfo = async (urlVideo) => {
        const response = await fetch(`api/videoinfos?url=${urlVideo}`, {});
        const data = await response.json();
        const title = data.videoDetails.title;
        console.log('info');
        return title;
    };

    const videoDownloader = (urlVideo, videoExt) => {
        fetch(`api/videodownloader?url=${urlVideo}&ext=${videoExt}`, {
        }).then(response => {
            response.blob().then(async blob => {
                console.log('teste', urlVideo);
                const title = await videoInfo(urlVideo);
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = `${title}.${videoExt}`;
                a.click();
                console.log('Finalizado.');
            });
        });
    };
    return <form onSubmit={onSubmit} className={styles['form']}>
        <Input type='text' onChange={(event) => handlerUrl(event)} placeholder='Coloque o link do vídeo aqui!' />
        <div>
            <Button type="submit" onClick={() => videoDownloader(urlVideo, 'mp4')}>MP4</Button>
            <Button type="submit" onClick={() => videoDownloader(urlVideo, 'mov')}>MOV</Button>
            <Button type="submit" onClick={() => videoDownloader(urlVideo, 'mp3')}>MP3</Button>
        </div>
    </form>;
};

export default Form;