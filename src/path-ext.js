import path from 'path';


const pathExt = (fp) => path.parse(fp).ext.slice(1);


export default pathExt;
