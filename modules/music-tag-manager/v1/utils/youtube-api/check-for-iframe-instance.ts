// #NOTE - If the API is not loading, try to delete cache.

export const checkForIframeInstance$ = async (): Promise<Error | null> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(null);
      } else {
        console.log("Future entity not available yet. Checking again...");
      }
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      resolve(new Error("YouTube API not loaded within the expected time."));
    }, 10_000);
  });
};
