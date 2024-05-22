import dbConfig from "../configs/db.config";

class UserService {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async signin(email, password) {
    try {
      const client = await this.dbConfig.connect();
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
  }

  async signup(email, password, username) {
    try {
      const client = await this.dbConfig.connect();
      const query =
        "INSERT INTO user_schema.user_data (username, email, password) VALUES ($1, $2, $3) RETURNING *";
      const values = [username, email, password];
      const result = await client.query(query, values);
      console.log("result", result);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error("Error saving user to database:", error);
      throw error;
    }
  }

  async profile(userId) {
    try {
      const client = await this.dbConfig.connect();
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
  }
}

// UserService 인스턴스 생성 및 export
const userService = new UserService(dbConfig);
export default userService;
