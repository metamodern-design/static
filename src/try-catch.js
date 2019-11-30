const tryCatch = async (call, msg) => {
  try {
    const result = await call();
    return result || 0;
  } catch (err) {
    console.error(msg(err));
    return 1;
  }
};


export default tryCatch;
