import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  getJobApplicants,
} from "../models/job.model.js";

export const renderJobs = (req, res) => {
  const jobs = getAllJobs();
  res.render("job-listings", { jobs });
};

export const renderJobDetails = (req, res) => {
  const job = getJobById(req.params.id);
  if (!job) return res.redirect("/404");
  res.render("job-details", { job });
};

export const createNewJob = (req, res) => {
  const { title, description, location, salary } = req.body;
  createJob({ title, description, location, salary });
  res.redirect("/jobs");
};

export const updateJobDetails = (req, res) => {
  const { title, description, location, salary } = req.body;
  const updated = updateJob(req.params.id, {
    title,
    description,
    location,
    salary,
  });
  if (updated) {
    res.redirect(`/jobs/${req.params.id}`);
  } else {
    res.redirect("/404");
  }
};

export const deleteJobPost = (req, res) => {
  const deleted = deleteJob(req.params.id);
  if (deleted) {
    res.redirect("/jobs");
  } else {
    res.redirect("/404");
  }
};

export const applyToJob = (req, res) => {
  const { name, email, contact } = req.body;
  const resumePath = req.file.path;
  const applicant = { name, email, contact, resumePath };

  const applied = applyForJob(req.params.id, applicant);
  if (applied) {
    sendConfirmationEmail(name, email);
    res.redirect(`/jobs/${req.params.id}`);
  } else {
    res.redirect("/404");
  }
};

export const sendConfirmationEmail = (name, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  const mailOptions = {
    from: "",
    to: email,
    subject: "Job Application Confirmation",
    text: `Dear ${name},\n\nYou have successfully applied for the job. Thank you!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
