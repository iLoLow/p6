const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce saved !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "unauthorized request." });
      } else {
        const oldImage = sauce.imageUrl.split("/images/")[1];
        if (req.file) {
          fs.unlink(`images/${oldImage}`, () => {});
        }
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modified !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce deleted !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            sauce,
            usersLiked: sauce.usersLiked,
            likes: sauce.usersLiked.length,
          }
        )
          .then(() => res.status(200).json({ message: "Sauce liked !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            sauce,
            usersDisliked: sauce.usersDisliked,
            dislikes: sauce.usersDisliked.length,
          }
        )
          .then(() => res.status(200).json({ message: "Sauce disliked !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (req.body.like === 0) {
        sauceLiked = sauce.usersLiked.indexOf(req.body.userId);
        sauceDisliked = sauce.usersDisliked.indexOf(req.body.userId);
        if (sauceLiked === -1) {
          sauce.usersDisliked.splice(sauceDisliked, 1);
          Sauce.updateOne(
            { _id: req.params.id },
            {
              sauce,
              usersDisliked: sauce.usersDisliked,
              dislikes: sauce.usersDisliked.length,
            }
          )
            .then(() => res.status(200).json({ message: "Sauce disliked !" }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          sauce.usersLiked.splice(sauceLiked, 1);
          Sauce.updateOne(
            { _id: req.params.id },
            {
              sauce,
              usersLiked: sauce.usersLiked,
              likes: sauce.usersLiked.length,
            }
          )
            .then(() => res.status(200).json({ message: "Sauce liked !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
