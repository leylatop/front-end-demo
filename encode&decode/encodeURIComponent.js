// URL元字符
const moreCharacters = [';', ',', '/', '?', ':', '@', '&', '=', '+', '$', '#'];
// 语义字符
const semanticCharacter = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U','V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '-', '_', '.', '!', '~', '*', "'", '(', ')'
];

// encodeURIComponent()函数会转码除了语义字符之外的所有字符，即元字符也会被转码；
for (let i = 0; i < moreCharacters.length; i++) {
  const encoded = encodeURIComponent(moreCharacters[i])
  console.log(moreCharacters[i], '---', encoded)
}

for (let i = 0; i < semanticCharacter.length; i++) {
  const encoded = encodeURIComponent(semanticCharacter[i])
  console.log(semanticCharacter[i], '===', encoded)
}

// encodeURIComponent比encodeURI编码的范围更大，主要是用来对URL的组成部分进行个别编码的，而不用于对整个URL进行编码。
