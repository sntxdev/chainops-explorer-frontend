export { formatTime } from './formatTime';
export { truncate } from './truncate';
export { isSHA256 } from './isSHA256';
export { isBech32 } from './isBech32';

export function keybase(identity: any) {
  return fetch(
    `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`
  ).then((res) => res.json());
}
