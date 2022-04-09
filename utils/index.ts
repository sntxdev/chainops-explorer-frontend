export { formatTime } from "./formatTime";
export { truncate } from "./truncate";

export function keybase(identity: any) {
  return fetch(
    `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`
  ).then((res) => res.json());
}
