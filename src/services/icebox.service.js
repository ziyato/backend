import dbConfig from "../configs/db.config";

const getFoodDataAll = async (user_id) => {
  const client = await dbConfig.connect();

  const query = "SELECT * FROM food_schema.food_data WHERE user_id = ($1)";
  const values = [user_id];
  const result = await client.query(query, values);
  console.log(`${user_id} 님의 음식 데이터 : `, result);

  client.release();
  return result.rows;
};

const getFoodData = async (user_id, food_id) => {
  const client = await dbConfig.connect();

  const query =
    "SELECT * FROM food_schema.food_data WHERE user_id = $1 AND food_id = $2";
  const values = [user_id, food_id];

  const result = await client.query(query, values);
  console.log(`${user_id} 님의 ${food_id}번의 음식 데이터 : `, result);

  client.release();
  return result.rows;
};

const postFoodData = async (
  user_id,
  food_name,
  food_pic,
  category,
  purchase_date,
  expiration_date
) => {
  try {
    const client = await dbConfig.connect();

    const query =
      "INSERT INTO food_schema.food_data (user_id, food_name, food_pic, category, purchase_date, expiration_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      user_id,
      food_name,
      food_pic,
      category,
      purchase_date,
      expiration_date,
    ];
    const result = await client.query(query, values);
    console.log("food_schema에 등록될 값 : ", result);

    client.release();

    // INSERT 쿼리 결과 반환
    return result.rows[0];
  } catch (error) {
    return "404";
    // console.error("Error saving food to database:", error);
    // throw error; // 에러 던지기
  }
};

export default {
  getFoodDataAll,
  getFoodData,
  postFoodData,
};
