/* eslint-disable consistent-return */
import fetchData from "./axios";

interface CustomDisplayMediaStreamOptions extends DisplayMediaStreamOptions {
  preferCurrentTab?: boolean;
}

async function startScreenRecording(fileName: string): Promise<MediaRecorder | void> {
  const testerId = fileName;
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      preferCurrentTab: true,
    } as CustomDisplayMediaStreamOptions);

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      const formData = new FormData();

      formData.append("video", blob, `${fileName}.mp4`);

      await fetchData("POST", `/testers/${testerId}/videourls`, formData);

      stream.getTracks().forEach((track) => track.stop());
    };

    recorder.start();

    return recorder;
  } catch (error) {
    console.error("Error starting screen recording", error);
  }
}

export default startScreenRecording;
