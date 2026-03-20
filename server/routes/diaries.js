const { Router } = require("express");
const diaryController = require("../controllers/diaries");

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.post("/", diaryController.create);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;
