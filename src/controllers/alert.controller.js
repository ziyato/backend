import alertService from "../services/alert.service";

const getAlertData = async (req, res) => {
  /**
   * @typedef {Object} inputData
   * @property {number} user_id - 사용자 식별자
   * @property {number} alert_date - 알람 기준일
   */
  const user_id = req.params.userId;
  const alert_date = req.query.alertDate;

  const foodData = await alertService.getAlertData(user_id, alert_date);

  if (foodData === "404") {
    res.status(404).send("Food not found"); //에러라서 없는것과, 찾았는데 없는것을 구분하기 위해 404로 설정
    return;
  } else {
    res.status(200).json(foodData);
    return;
  }
};

export default {
  getAlertData,
};
