const addLinkListeners = (doc, history) => {
  const panel = doc.getElementById('pageContent');
  const links = panel.querySelectorAll('a[href]');

  links.forEach(
    (a) => {
      const url = a.getAttribute('href');

      a.addEventListener('click', (e) => {
        e.preventDefault();
        history.push(url);
      });
    },
  );
};


export default addLinkListeners;
