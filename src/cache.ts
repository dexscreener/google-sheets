const cacheStore = CacheService.getScriptCache();
const fetchFromCacheMaxAttempts = 3;

const minSleepTimeInMs = 500; // 0.5 seconds
const sleepTimeInMs = Math.floor(minSleepTimeInMs + Math.random() * minSleepTimeInMs);

const cacheExpirationInSeconds = 60;

const cacheControlKey = (endpoint: string): string => `control:${endpoint}`;
const cacheContentKey = (endpoint: string): string => `content:${endpoint}`;

type Cached = { cachedResponse: string; cacheControl: string };

const getResponseFromCache = (endpoint: string): Cached => {
  const controlKey = cacheControlKey(endpoint);
  const contentKey = cacheContentKey(endpoint);

  const cacheKeys = [contentKey, controlKey];
  const result = cacheStore.getAll(cacheKeys);

  return { cachedResponse: result[contentKey], cacheControl: result[controlKey] };
};

export const fetchFromCache = (endpoint: string, attempts: number = 1): string | null => {
  if (attempts === fetchFromCacheMaxAttempts) return null;

  const { cachedResponse } = getResponseFromCache(endpoint);
  if (cachedResponse) return cachedResponse;

  Utilities.sleep(sleepTimeInMs);
  return fetchFromCache(endpoint, attempts + 1);
};

export const storeResponseOnCache = (endpoint: string, response: string): void => {
  const controlKey = cacheControlKey(endpoint);
  const contentKey = cacheContentKey(endpoint);

  const cachedValues = { [contentKey]: response, [controlKey]: 'done' };

  cacheStore.putAll(cachedValues, cacheExpirationInSeconds);
};

export const markAsFetching = (endpoint: string): void => {
  const controlKey = cacheControlKey(endpoint);
  cacheStore.put(controlKey, 'fetching', cacheExpirationInSeconds);
};
