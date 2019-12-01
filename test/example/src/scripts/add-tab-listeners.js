const addTabListeners = (doc, history) => {
  const nav = doc.getElementById('pageNav');
  const tabs = nav.querySelectorAll('button[data-url]');

  tabs.forEach(
    (button) => {
      const url = button.getAttribute('data-url');

      button.addEventListener('click', () => {
        history.push(url);
      });
    },
  );
};


export default addTabListeners;
