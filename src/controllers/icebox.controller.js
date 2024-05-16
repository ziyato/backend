import iceboxService from "../services/icebox.service.js";

//유저 아이스박스에 있는 모든 음식 데이터를 가져오는 함수
const getFoodDataAll = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   */
  const user_id = req.params.userId;

  const foodData = await iceboxService.getFoodDataAll(user_id);
  res.status(200).json(foodData);
};

//유저 아이스박스에 있는 특정 음식 데이터를 가져오는 함수
const getFoodData = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   * @property {number} food_id
   */

  const user_id = req.params.userId;
  const food_id = req.params.foodId;

  const foodData = await iceboxService.getFoodDataAll(user_id, food_id);
  res.status(200).json(foodData);
};

//유저 아이스박스에 음식 데이터를 추가하는 함수
const postFoodData = async (req, res) => {
  /**
   * @userData {Object}
   * @property {number} user_id
   * @property {string} food_name
   * @property {string} food_pic
   * @property {string} category
   * @property {string} purchase_date
   * @property {string} expiration_date
   */
  let user_id = req.params.userId;
  let { food_name, food_pic, category, purchase_date, expiration_date } =
    req.body;
  let result = await iceboxService.postFoodData(
    user_id,
    food_name,
    food_pic,
    category,
    purchase_date,
    expiration_date
  );
  if (result === "404") {
    res.status(404).send("음식 등록 실패");
    return;
  } else {
    res.send(result);
  }
};

export default {
  getFoodDataAll,
  getFoodData,
  postFoodData,
};
