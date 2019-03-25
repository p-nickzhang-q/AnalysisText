const posTagger = require('wink-pos-tagger');
const tagger = posTagger();
const nounPos = ['NN', 'NNS', 'NNP', 'NNPS'];
// const verbPos = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'];
const adjPos = ['JJ', 'JJR', 'JJS'];
const advPos = ['RB', 'RBR', 'RBS'];
const poss = [...nounPos, ...adjPos, ...advPos];

module.exports.getMostlyMeaningFulWords = (text) => {
    const wordMap = {};
    const tags = tagger.tagSentence(text);
    tags.forEach(tag => {
        if (poss.indexOf(tag.pos) !== -1 && (tag.tag === 'word')) {
            if (!wordMap[tag.value]) {
                wordMap[tag.value] = 0;
            }
            wordMap[tag.value]++;
        }
    })
    const countArr = [];
    const words = Object.keys(wordMap);
    words.forEach(word => {
        countArr.push(wordMap[word]);
    })
    const newCountArr = countArr.sort((a, b) => {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1
        } else {
            return 0;
        }
    }).reverse();
    const TenMostlyWords = [];
    for (let index = 0; index < 10; index++) {
        const count = newCountArr[index];
        if (!count) {
            break;
        }
        const temp = words.find(word => {
            return wordMap[word] === count && TenMostlyWords.indexOf(word) === -1;
        });
        TenMostlyWords.push(temp);
    }
    return TenMostlyWords;
}