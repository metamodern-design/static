import path from 'path';


const ext = (fp) => path.parse(fp).ext.slice(1);


export default ext;
