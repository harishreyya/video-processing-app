export const analyzeVideo = async (videoPath) => {
  await new Promise((res) => setTimeout(res, 2000));

  const isSafe = Math.random() > 0.3;

  return isSafe ? "safe" : "flagged";
};