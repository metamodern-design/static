import MarkdownIt from 'markdown-it';


const renderMd = (str, options = {
  html: true,
  linkify: true,
  typographer: true,
}) => {
  const instance = new MarkdownIt(options);

  return instance.render(str);
};


export default renderMd;
