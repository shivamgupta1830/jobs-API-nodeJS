const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

// router.get("/", getAllJobs);
// router.get("/:id", getSingleJob);
// router.post("/", createJob);
// router.patch("/:id", updateJob);
// router.delete("/:id", deleteJob);

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = router;
