function tokenAuth(keyword) {
  return {
    type: 'tokenAuth',
    payload: keyword
  };
}

export {tokenAuth};