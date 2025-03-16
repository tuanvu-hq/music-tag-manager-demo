export const injectIframeAPI = () => {
  const youTubeAPI = document.createElement("script");

  youTubeAPI.src = "https://www.youtube.com/iframe_api";

  document.head.appendChild(youTubeAPI);
};
