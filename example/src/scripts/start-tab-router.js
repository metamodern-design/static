import addLinkListeners from './add-link-listeners';
import addTabListeners from './add-tab-listeners';
import setLocation from './set-location';


const startTabRouter = (doc, history, routeMap) => {
  const navigate = setLocation(doc, history, routeMap);

  addTabListeners(doc, history);

  if (history.location !== '/') {
    navigate(history.location);
  } else {
    addLinkListeners(doc, history);
  }

  history.listen(navigate);
};


export default startTabRouter;
