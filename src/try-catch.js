const tryCatch = (call, msg) => {
  try {
    call();
  } catch (err) {
    console.error(msg(err));
  }
};


export default tryCatch;
