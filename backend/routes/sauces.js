const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multerStorage = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.post("/", auth, multerStorage, saucesCtrl.createSauce);
router.put("/:id", auth, multerStorage, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;
