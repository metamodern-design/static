const tryCatch = async (call, msg) => {
  try {
    await call();
  } catch (err) {
    console.error(msg(err));
  }
};


export default tryCatch;
