const caseOf = (x, kv, dflt) => {
  const mp = new Map(kv);

  return mp.get(x) || dflt;
};


export default caseOf;
