const express = require('express');
const videoService = require('./videoService');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/generate-transcription', async (req, res) => {
  const videoUid = await videoService.generateTranscription(req.body.videoTemplateUid, req.body.videoUrl);
  const transcription = await videoService.getTranscription(videoUid);

  res.json({
    videoUid: videoUid,
    transcription: transcription,
  });
});

app.post('/add-closed-captions', async (req, res) => {
    const videoUrl = await videoService.addClosedCaptions(req.body.videoUid, req.body.transcription);
    res.json({
        videoUrl: videoUrl
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
