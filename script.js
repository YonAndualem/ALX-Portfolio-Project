const featuredJobsList = document.getElementById('featured-jobs-list');
const recentJobsList = document.getElementById('recent-jobs-list');

let jobs = [];
let filteredJobs = [];

fetch('job-data.json')
  .then(response => response.json())
  .then(data => {
    jobs = data.featuredJobs.concat(data.recentJobs);
    filteredJobs = jobs;
    renderJobs(filteredJobs);
  })
  .catch(error => {
    console.error('Error fetching job data:', error);
  });

const keywordInput = document.getElementById('keyword-input');
const locationInput = document.getElementById('location-input');
const applyFiltersButton = document.querySelector('.btn-primary');

keywordInput.addEventListener('input', filterJobs);
locationInput.addEventListener('input', filterJobs);
applyFiltersButton.addEventListener('click', filterJobs);

function filterJobs() {
  const keyword = keywordInput.value.toLowerCase();
  const location = locationInput.value.toLowerCase();

  filteredJobs = jobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    const jobLocation = job.location.toLowerCase();

    return jobTitle.includes(keyword) && jobLocation.includes(location);
  });

  renderJobs(filteredJobs);
}

function renderJobs(jobs) {
  featuredJobsList.innerHTML = '';
  recentJobsList.innerHTML = '';

  jobs.forEach(job => {
    const jobHtml = `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p>${job.company} - ${job.location}</p>
        <p>${job.description}</p>
        <ul>
          ${job.requirements.map(requirement => `<li>${requirement}</li>`).join('')}
        </ul>
        <a href="${job.applyLink}" class="apply-button">Apply</a>
      </div>
    `;

    if (job.featured) {
      featuredJobsList.innerHTML += jobHtml;
    } else {
      recentJobsList.innerHTML += jobHtml;
    }
  });
}
