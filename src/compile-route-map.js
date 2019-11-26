import path from 'path';
import renderTemplate from './render-template';


const compileRouteMap = async (
  routes,
  locals = {},
  options = {},
  publicUrl = '',
) => {
  const routeMap = routes.map(
    ({ routeUrl, entryPath }) => [
      path.join(publicUrl, routeUrl),
      await renderTemplate(entryPath, locals, options),
    ],
  );

  return [
    `const routeMap = new Map(${JSON.stringify(routeMap)});`,
    'export default routeMap;',
  ].join('\n');
};


export default compileRouteMap;
