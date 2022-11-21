const old = require("./_data/researches.json");
// const zotero = require('./researches_zotero.json');
const l = require("./levenshtein");

require("dotenv").config();
const axios = require("axios");

const getNextLink = (linkHeader) => {
  if (linkHeader && linkHeader.indexOf('rel="next"') > 0) {
    let nextLink = linkHeader
      .split(",")
      .filter((l) => {
        if (l.indexOf('rel="next"')) {
          return true;
        }
        return false;
      })[0]
      .split(";")[0]
      .substring(1);

    nextLink = nextLink.substring(0, nextLink.length - 1);
    return nextLink;
  }
  return null;
};

const getFromZotero = async () => {
  let nextLink = `https://api.zotero.org/users/${process.env.ZOTERO_USER_ID}/items?v=3&limit=100`;
  let items = [];

  do {
    const res = await axios.get(nextLink, {
      headers: {
        Authorization: `Bearer ${process.env.ZOTERO_API_KEY}`,
      },
    });

    if (res.status !== 200) {
      console.log(
        "Zotero publication fetching failed with status code",
        res.status
      );
      return items;
    }

    items = items.concat(res.data);

    nextLink = getNextLink(res.headers.get("Link"));
  } while (nextLink);

  return items;
};

const getName = (author) => {
  const { firstName, lastName, name } = author;
  let fullName;
  if (!firstName || !lastName) {
    fullName = name;
  } else {
    fullName = firstName + " " + lastName;
  }

  author.fullName = fullName;
  delete author.creatorType;

  return author;
};

getFromZotero().then((zotero) => {
  const result = zotero.filter(r=>r.data.title && r.data.creators && r.data.title !== '' && r.data.creators.length > 0).map((r) => {
    const title = r.data.title || '';
    const authors = r.data.creators.map(getName) || [];

    const date = {
      year: r.data.date.split("-")[0],
      raw: r.data.date,
    };

    let i = -1;
    let min = 99999;
    old.forEach((o, idx) => {
      const d = l(o.paper.title.toLowerCase(), title.toLowerCase());
      if (d < min) {
        min = d;
        i = idx;
      }
    });
    const url = old[i].paper.url;
    let publisher = "";
    if (r.data.extra.length !== 0) {
      const [_, p] = r.data.extra.split(":");
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
    };
  });

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
  });

  console.log(JSON.stringify(result, null, 2));
});
