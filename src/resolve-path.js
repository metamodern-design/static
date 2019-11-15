import path from 'path';


const resolvePath = (paths) => path.resolve(...[].concat(paths));


export default resolvePath;
