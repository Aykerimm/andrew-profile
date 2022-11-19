
const old = require('./_data/researches.json');
const zotero = require('./researches_zotero.json');
const l = require('./levenshtein');

const getName = (author) => {
    const {firstName, lastName} = author;
    
    const fullName = firstName + " " + lastName;
    author.fullName = fullName;
    delete author.creatorType

    return author
}

const result = zotero.map(r => {
    const title = r.data.title;
    const authors = r.data.creators.map(getName);
    
    const date = {
        year: r.data.date.split('-')[0],
        raw: r.data.date
    }

    let i = -1;
    let min = 99999;
    old.forEach((o, idx) => {
        const d = l(o.paper.title.toLowerCase(), title.toLowerCase());
        if (d < min) {
            min = d;
            i = idx;
        }
    })
    const url = old[i].paper.url;
    let publisher = "";
    if (r.data.extra.length !== 0) {
        const [_, p] = r.data.extra.split(':')
        if (p) {
            publisher = p.trim();
        }
    }
    return {
        title,
        date,
        url,
        publisher,
        authors,
    }
})

result.sort((a, b) => {
    const adate = new Date(a.date.raw);
    const bdate = new Date(b.date.raw);

    if (bdate < adate) {
        return -1;
    }
    if (bdate > adate) {
        return 1;
    }
    return 0;
})

// console.log(result[0].date.raw, new Date(result[0].date.raw))

console.log(JSON.stringify(result));



