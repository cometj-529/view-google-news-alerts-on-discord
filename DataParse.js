const xmlConverter = require("xml-js");

const keywords = [
  {
    code: "ai",
    name: "AI",
    url: "https://www.google.co.kr/alerts/feeds/13265101432195258979/14394231679378804535",
  },
  {
    code: "developer",
    name: "개발자",
    url: "https://www.google.co.kr/alerts/feeds/13265101432195258979/7104111078997508033",
  },
  {
    code: "hire",
    name: "IT 채용",
    url: "https://www.google.co.kr/alerts/feeds/13265101432195258979/16223367668120911101",
  },
];

const getData = async () => {
  return await Promise.all(
    keywords.map(async (e) => {
      const dataFromGoogle = await getDataFromGoogle(e);

      return dataFromGoogle;
    })
  );
};

const getDataFromGoogle = (keyword) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(keyword.url);

    const data = JSON.parse(xmlConverter.xml2json(await res.text()));

    data.elements.forEach((e1) => {
      const entrys = e1.elements.filter((e) => e.name === "entry");

      const datas = entrys.map((e2) => {
        const strFilter1 = /<.*?>/g;
        const strFilter2 = /&.*;/g;
        const entry = e2.elements;

        const title = entry[1].elements[0].text
          .replace(strFilter1, "")
          .replace(strFilter2, "");
        const link = entry[2].attributes.href;
        const createdAt = entry[3].elements[0].text;
        const content = entry[5].elements[0].text
          .replace(strFilter1, "")
          .replace(strFilter2, "");

        return {
          ...keyword,
          title,
          link,
          createdAt,
          content,
        };
      });

      resolve(datas);
    });
  });
};

module.exports = {
  getData,
};
