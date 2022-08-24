'use strict';

const getFileData = e => {
  const file = e.target.files[0] || {};

  let { name, size } = file;

  // We get size in bytes
  // to convert it into MB we divide it by 1000000
  size = (size / 1000000).toFixed(2);

  return { name, size };
};

export { getFileData };
