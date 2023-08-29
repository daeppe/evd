import ytdl from 'ytdl-core';

export default async function handler(req, res) {
    try {
        const output = await ytdl.getBasicInfo(req.query.url)

        res.status(200).json(output)

    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
}