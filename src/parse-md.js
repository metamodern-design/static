import MarkdownIt from 'markdown-it';


const parseMd = (str) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  return md.render(str);
};


export default parseMd;
