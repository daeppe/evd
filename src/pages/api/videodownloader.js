import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  try {
    const isMp3 = req.query.ext === 'mp3'
    res.setHeader("Content-Disposition", 'attachement')
    return isMp3 ?
      ytdl(req.query.url, {
        quality: 'highestaudio',
        filter: 'audioonly'
      }).pipe(res)
      :
      ytdl(req.query.url, {
        quality: 'highestaudio',
      }).pipe(res)

  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
}
