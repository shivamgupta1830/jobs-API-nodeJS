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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.find({ _id: jobId, createdBy: userId });
    if (!job) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with id${jobId}` });
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({ success: true, job });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;

    if (company === "" || position === "") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "provide all required details" });
    }
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with id${jobId}` });
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with id${jobId}` });
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
