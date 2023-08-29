'use client';

import { useState } from "react";

export default function Home() {

  const [urlVideo, setUrlVideo] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Está aqui', urlVideo);
  };


  const handlerUrl = (event) => {
    setUrlVideo(event.target.value)
    console.log(urlVideo)
  }

  const videoInfo = async (urlVideo) => {
    const response = await fetch(`api/videoinfos?url=${urlVideo}`, {});
    const data = await response.json();
    const title = data.videoDetails.title;
    console.log('info')
    return title;
  }

  const videoDownloader = (urlVideo, videoExt) => {
    fetch(`api/videodownloader?url=${urlVideo}&ext=${videoExt}`, {
    }).then(response => {
      response.blob().then(async blob => {
        console.log('teste', urlVideo)
        const title = await videoInfo(urlVideo)
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `${title}.${videoExt}`;
        a.click();
        console.log('Finalizado.')
      });
    });
  }

  return (
    <div>
      <h1>EVD - Video Download </h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(event) => handlerUrl(event)} />
        <button type="submit" onClick={() => videoDownloader(urlVideo, 'mp4')}>MP4</button>
        <button type="submit" onClick={() => videoDownloader(urlVideo, 'mov')}>MOV</button>
        <button type="submit" onClick={() => videoDownloader(urlVideo, 'mp3')}>MP3</button>
      </form>
    </div>
  )
}
