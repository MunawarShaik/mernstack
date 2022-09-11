const { response } = require("express");
const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../modal/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the router server`);
});

/// using promises
// router.post("/register",  (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plz fill all the details" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "email already exists" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((err) =>
//           res.status.apply(500).json({ error: "failed to register" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // res.json({ message: req.body });
//   // res.send("my register page");
// });

/// using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill all the details" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exists" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });

    await user.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
