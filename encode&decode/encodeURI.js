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

// encodeURI()函数会将元字符和语义字符之外的字符，都进行转义
for (let i = 0; i < moreCharacters.length; i++) {
  const encoded = encodeURI(moreCharacters[i])
  console.log(moreCharacters[i], '---', encoded)
}

for (let i = 0; i < semanticCharacter.length; i++) {
  const encoded = encodeURI(semanticCharacter[i])
  console.log(semanticCharacter[i], '===', encoded)
}

var url = "http://example.com/?name=John Doe;,/?:@&=+$#";
console.log(encodeURI(url)); // http://example.com/?name=John%20Doe