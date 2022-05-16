export const isBech32 = (str: string) => {
  const regexExp = /^(archwayvaloper|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/gi;
  return regexExp.test(str);
};

console.log(isBech32('archwayvaloper1yh9xhsnnveys532df2nfsuwj44pj6kf4hzkvpf'));

// https://github.com/cosmos/cosmos-sdk/blob/main/types/address.go
// https://docs.like.co/developer/likecoin-chain-api/cosmos-concepts#:~:text=The%20Cosmos%20address%20is%20derived,bech32%20with%20cosmos%20as%20prefix.
// https://gist.github.com/nnkken/90428d73f38d957de1b75ec3992d9342#file-sign-js

// archwayvalcons1mf55tpdmywda28lkl0mpcy93apdjmdc8z4a09x
// archway1yh9xhsnnveys532df2nfsuwj44pj6kf4hxlwvq
// archwayvaloper1yh9xhsnnveys532df2nfsuwj44pj6kf4hzkvpf
