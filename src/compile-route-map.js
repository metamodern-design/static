import path from 'path';
import renderTemplate from './render-template';
import tryCatch from './try-catch';


const compileRouteMap = async (routes, {
  locals = {},
  options = {},
  publicUrl = '',
  templatesDir = '',
}) => {
  const parseEntry = ({ url, template }) => tryCatch(
    async () => [
      path.join(publicUrl, url),
      await renderTemplate([templatesDir, template], locals, options),
    ],
    (err) => `Invalid route map: ${err}`,
  );

  const routeMap = await Promise.all(
    routes.map(parseEntry),
  );

  return [
    `const routeMap = new Map(${JSON.stringify(routeMap)});`,
    'export default routeMap;',
  ].join('\n');
};


export default compileRouteMap;
