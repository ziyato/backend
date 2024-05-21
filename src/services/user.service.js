import dbConfig from "../configs/db.config";

// 로그인 함수 정의
const signin = async (email, password) => {
  try {
    const client = await dbConfig.connect();

    const query =
      "SELECT * FROM user_schema.user_data WHERE email = $1 AND password = $2";
    const values = [email, password];
    const result = await client.query(query, values);
    console.log("result", result);

    client.release();

    if (!result.rows[0]) {
      return "404";
    } else {
      return result.rows[0];
    }
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};

const signup = async (email, password, username) => {
  try {
    const client = await dbConfig.connect();

    const query =
      "INSERT INTO user_schema.user_data (username, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [username, email, password];
    const result = await client.query(query, values);
    console.log("result", result);

    client.release();

    // INSERT 쿼리 결과 반환
    return result.rows[0];
  } catch (error) {
    return "404";
    // console.error("Error saving user to database:", error);
    // throw error; // 에러 던지기
  }
};

const profile = async (userId) => {
  try {
    const client = await dbConfig.connect();

    const query = "SELECT * FROM user_schema.user_data WHERE user_id = $1";
    const values = [userId];
    const result = await client.query(query, values);
    console.log("result", result);

    client.release();

    if (!result.rows[0]) {
      return "404";
    } else {
      return result.rows[0];
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// 다른 파일에서 사용할 수 있도록 export
export default {
  signin,
  signup,
  profile,
};
