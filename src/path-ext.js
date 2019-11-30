import path from 'path';


const pathExt = (fp) => path.parse(...[].concat(fp)).ext.slice(1);


export default pathExt;
