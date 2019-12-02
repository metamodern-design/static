import path from 'path';
import pathResolve from './path-resolve';


const pathExt = (fp) => path.parse(pathResolve(fp)).ext.slice(1);


export default pathExt;
