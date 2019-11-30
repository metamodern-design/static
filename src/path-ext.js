import path from 'path';


const pathExt = (fp) => {
  console.log(fp);
  const extStr = path.parse(fp).ext || '';
  
  return extStr.slice(1);
};


export default pathExt;
