const setPageContent = (doc, html) => {
  const panel = doc.getElementById('pageContent');
  panel.innerHTML = html;
};

export default setPageContent;
