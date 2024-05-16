import loginService from "../services/user.service";

const userLogin = async (req, res, next) => {
  /**
   * @userData {Object}
   * @property {string} username - 사용자 닉네임
   * @property {string} password - 비밀번호
   */
  let { email, password } = req.body;
  let userData = await loginService.signin(email, password);
  if (userData === "404") {
    res.status(404).send("User not found");
    return;
  } else {
    res.send(userData);
    return;
  }
};

const userSignin = async (req, res, next) => {
  /**
   * @userData {Object} - 사용자 데이터
   * @property {string} email - 사용자 아이디
   * @property {string} username - 사용자 닉네임
   * @property {string} password - 비밀번호
   */
  let { email, password, username } = req.body;
  // next(await loginService.signup(email, password, username));
  let result = await loginService.signup(email, password, username);
  res.send(result);
};

export default {
  userLogin,
  userSignin,
};
