const tryCatch = (call, msg) => {
  try {
    const result = call();
    return result || 0;
  } catch (err) {
    console.error(msg(err));
    return 1;
  }
};


export default tryCatch;
