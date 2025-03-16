export const checkNetworkIdleHandler = () => {
  const performance = window.performance;
  let loadTime = 0;
  let resourceState = "No resources found.";

  if (!performance) return;

  const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

  if (timing) {
    loadTime = timing.loadEventEnd - timing.startTime;
  }

  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

  if (resources && resources.length > 0) {
    let loaded = true;

    resources.forEach((resource) => {
      if (resource.transferSize !== resource.encodedBodySize) {
        loaded = false;
      }
    });

    resourceState = loaded ? "All resources loaded." : "Resources are still loading.";
  }

  return { loadTime, resourceState };
};
