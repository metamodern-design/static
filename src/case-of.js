const caseOf = (x, kv, default) => {
  const mp = new Map(kv);

  return mp.get(x) || default;
};


export default caseOf;
