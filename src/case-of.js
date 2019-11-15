const caseOf = (x, kv, defaultValue) => {
  const mp = new Map(kv);

  return mp.get(x) || defaultValue;
};


export default caseOf;
