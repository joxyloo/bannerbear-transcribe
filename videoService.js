const { Bannerbear } = require('bannerbear');

const bb = new Bannerbear("your_api_key");

exports.generateTranscription = async function (videoTemplateUid, videoUrl) {
  const res = await bb.create_video(videoTemplateUid, {
    input_media_url: videoUrl,
  });

  return res.uid;
};

exports.getTranscription = async function (videoUid) {
  let status = '';
  let res;
  while (status !== 'pending_approval') {
    res = await bb.get_video(videoUid);
    status = res.status;
  }

  return res.transcription;
};

exports.addClosedCaptions = async function (videoUid, transcription) {
  await bb.update_video(videoUid, {
    approved: true,
    transcription: transcription,
  });

  let status = '';
  let res;
  while (status !== 'completed') {
    res = await bb.get_video(videoUid);
    status = res.status;
    console.log(res);
  }
  return res.video_url;
};
