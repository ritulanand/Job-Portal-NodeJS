export const jobs = [
  {
    id: 1,
    title: "Software Developer",
    description: "Build awesome web applications.",
    companyName: "Tech Corp",
    location: "New York",
    salary: "60,000 USD",
    applicants: [],
  },
];

export const createJob = (job) => {
  const id = jobs.length + 1;
  jobs.push({ ...job, id });
  return true;
};

export const getAllJobs = () => jobs;

export const getJobById = (id) => jobs.find((job) => job.id === id);

export const updateJob = (id, updatedJob) => {
  const index = jobs.findIndex((job) => job.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
    return true;
  }
  return false;
};

export const deleteJob = (id) => {
  const index = jobs.findIndex((job) => job.id === id);
  if (index !== -1) {
    jobs.splice(index, 1);
    return true;
  }
  return false;
};

export const applyForJob = (jobId, applicant) => {
  const job = getJobById(jobId);
  if (job) {
    job.applicants.push(applicant);
    return true;
  }
  return false;
};

export const getJobApplicants = (jobId) => {
  const job = getJobById(jobId);
  return job ? job.applicants : [];
};
