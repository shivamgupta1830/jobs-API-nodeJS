const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    res
      .status(StatusCodes.OK)
      .json({ success: true, totalResults: jobs.length, jobs });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const getSingleJob = async (req, res) => {
  try {
    res.send("Single Job");
  } catch (error) {}
};

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({ success: true, job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const updateJob = (req, res) => {
  res.send("Update Job");
};

const deleteJob = (req, res) => {
  res.send("Delete Job");
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
