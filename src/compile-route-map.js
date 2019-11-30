import path from 'path';
import renderTemplate from './render-template';


const compileRouteMap = async (
  routes,
  locals = {},
  options = {},
  publicUrl = '',
) => {
  const routeMap = routes.map(tryCatch(
    async ({ url, template }) => [
      path.join(publicUrl, url),
      await renderTemplate(template, locals, options),
    ],
    (err) => `Invalid route map: ${err}`,
  ));

  return [
    `const routeMap = new Map(${JSON.stringify(routeMap)});`,
    'export default routeMap;',
  ].join('\n');
};


export default compileRouteMap;
