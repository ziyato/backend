import recipeService from "../services/recipe.service";

const recipe = async (req, res, next) => {
  /**
   * @data {string[]}
   */
  //나중에 foodData가 몇개인지 확인하는 코드 추가
  let foodData = req.body;
  if (!foodData) {
    return next(new Error("data is required"));
  }
  const recipeData = await recipeService.recipe(foodData.foods);

  if (recipeData === "404") {
    res.status(404).send("GPT 문제생김 나중에 해결바람"); //에러라서 없는것과, 찾았는데 없는것을 구분하기 위해 404로 설정
    return;
  } else {
    res.status(200).json(recipeData);
    return;
  }
};

export default {
  recipe,
};
