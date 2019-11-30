const tryCatch = async (call, msg) => {
  try {
    const result = await call();
    return result || 0;
  } catch (err) {
    const newErr = new Error(msg(err));
    console.error(newErr.stack);
    return 1;
  }
};


export default tryCatch;
