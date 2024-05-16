import dbConfig from "../configs/db.config";

const getAlertData = async (user_id, alert_date) => {
  const client = await dbConfig.connect();
  console.log("user_id", user_id);
    console.log("alert_date : ", alert_date);

  const query = `
    SELECT *
    FROM food_schema.food_data
    WHERE user_id = $1 
      AND expiration_date < CURRENT_DATE + INTERVAL '${alert_date} days';
  `;
  const values = [user_id];
  const result = await client.query(query, values);
  console.log(`${user_id} 님의 음식 데이터 : `, result);

  client.release();
  return result.rows;
};

export default {
  getAlertData,
};
