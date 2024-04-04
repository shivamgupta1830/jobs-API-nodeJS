const getAllJobs = (req, res) => {
  res.send("All jobs");
};

const getSingleJob = (req, res) => {
  res.send("Single Job");
};

const createJob = (req, res) => {
  res.send("Create Job");
};

const updateJob = (req, res) => {
  res.send("Update Job");
};

const deleteJob = (req, res) => {
  res.send("Delete Job");
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
