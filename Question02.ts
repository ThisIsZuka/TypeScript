function findShortestWord(data: string[]): number {
  let shortestLength: number = Infinity;
  let shortestIndex: number = 0;

  for (let [index, str] of data.entries()) {
    let onlyCharacter = str.match(/[A-Za-z]/g) || [];

    let len = onlyCharacter.length;

    if (len < shortestLength) {
      shortestLength = len;
      shortestIndex = index;
    }
  }

  return shortestIndex;
}

function findLongestWord(data: string[]): string {
  let longestString = data[0] || "";

  for (const str of data) {
    if (str.length > longestString.length) {
      longestString = str;
    }
  }

  return longestString;
}

function removeWordFromArray(word: string, list: string[]): string[] {
  return list.map((element) => element.replace(new RegExp(word, "g"), ""));
}

function findResult(list: string[], index: number): string[] {
  let result: string[] = [];

  let listNew: string[] = [...list];
  listNew.splice(index, 1);

  let vowels: string[] = ["A", "E", "I", "O", "U"];

  let chars: string[] = Array.from(list[index]);

  let vowelIndex: number[] = [];

  for (let i = 0; i < chars.length; i++) {
    if (vowels.includes(chars[i])) {
      vowelIndex.push(i);
    }
  }
  // console.log(vowelIndex);
  // [ 1, 5, 6 ]
  let listWordFront: string[] = [];
  for (let i = 0; i < vowelIndex.length; i++) {
    // console.log(vowelIndices[i]);
    let charVowel: string = chars[vowelIndex[i]];

    let word = fontWordFindMatch(vowelIndex, i, chars, charVowel, listNew);
    listWordFront.push(word);
    // break;
  }

  let listWordBack: string[] = [];
  for (let i = 0; i < listWordFront.length; i++) {
    // console.log(listWord[i]);
    let frontWord: string = listWordFront[i];
    let word = backWordFindMatch(vowelIndex, i, chars, frontWord, listNew);
    listWordBack.push(word);
  }

  let longestWord = findLongestWord(listWordBack);

  result = removeWordFromArray(longestWord, list);
  // console.log(result);

  return result;
}

function fontWordFindMatch(
  vowelIndex: number[],
  i: number,
  chars: string[],
  charVowel: string,
  listNew: string[]
): string {
  let word: string = charVowel;

  if (vowelIndex[i] != 0) {
    let prevWord: string = word;
    for (let x = vowelIndex[i] - 1; x >= 0; x--) {
      word = chars[x] + word;

      let isSubstringInAll = checkWordMacth(word, listNew);
      if (isSubstringInAll == false) {
        word = prevWord;
        break;
      }
      prevWord = word;
    }
  }

  return word;
}

function backWordFindMatch(
  vowelIndex: number[],
  i: number,
  chars: string[],
  frontword: string,
  listNew: string[]
): string {
  let word: string = frontword;

  let prevWord: string = word;

  for (let x = vowelIndex[i] + 1; x < chars.length; x++) {
    word = word + chars[x];

    let isSubstringInAll = checkWordMacth(word, listNew);
    if (isSubstringInAll == false) {
      word = prevWord;
      break;
    }
    prevWord = word;
  }
  return word;
}

function checkWordMacth(substring: string, arr: string[]): boolean {
  return arr.every((element) => element.includes(substring));
}

function getQuestionPart(phrases: string[]): string[] {
  const shortestIndex = findShortestWord(phrases);

  const Ans = findResult(phrases, shortestIndex);

  // return array of three strings that makes a question for "Remote Associates Test".
  return Ans;
}

const result = getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"]);
console.log(result);
