const getMoreInfo = (userInfo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userInfo.id === 1) {
        resolve({ ...userInfo, score: 100 });
      } else {
        reject({ err: { msg: '用户不存在' } });
      }
    }, 1000);
  });
};

const login = (userInfo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userInfo.name === 'yl') {
        resolve({ id: 1, name: 'hello yl' });
      } else {
        reject({ err: { msg: '用户名或密码错误' } });
      }
    }, 1000);
  });
};

const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {}, 1000);
  });
};

export const userService = {
  login,
  logout,
  getMoreInfo,
};
