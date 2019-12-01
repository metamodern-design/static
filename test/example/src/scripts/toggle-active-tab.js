const toggleActiveTab = (doc, location) => {
  const nav = doc.getElementById('pageNav');
  const tabs = nav.querySelectorAll('button[data-url]');

  tabs.forEach(
    (button) => {
      const url = button.getAttribute('data-url');

      if (url === location.pathname) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    },
  );
};


export default toggleActiveTab;
