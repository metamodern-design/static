import addCopyListeners from './add-copy-listeners';
import addLinkListeners from './add-link-listeners';
import setPageContent from './set-page-content';
import toggleActiveTab from './toggle-active-tab';


const setLocation = (doc, history, routeMap) => (location) => {
  const html = routeMap.get(location.pathname);

  setPageContent(doc, html);
  toggleActiveTab(doc, location);
  addLinkListeners(doc, history);
  addCopyListeners(doc);
};


export default setLocation;
