/* global window */
import copy from 'clipboard-copy';

const addCopyListeners = (doc) => {
  const panel = doc.getElementById('pageContent');
  const addresses = panel.querySelectorAll('.email');

  const popup = doc.createElement('span');
  popup.className = 'popup';
  popup.textContent = 'Copied to clipboard';

  addresses.forEach(
    (p) => {
      const address = p.textContent.split('').reverse().join('');

      p.addEventListener('click', (e) => {
        copy(address);
        e.target.appendChild(popup);
        window.setTimeout(() => e.target.removeChild(popup), 2000);
      });
    },
  );
};


export default addCopyListeners;
