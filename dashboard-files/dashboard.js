const experiments = [
  // Web Technology Experiments
  {
    id: 1,
    title: "HTML Tags Showcase",
    desc: "Create a comprehensive webpage using HTML that includes all essential tags and semantic elements.",
    category: "Web Technology",
  },
  {
    id: 2,
    title: "Styling with CSS",
    desc: "Apply advanced styles to an HTML page using CSS, including animations and responsive design.",
    category: "Web Technology",
  },
  {
    id: 3,
    title: "Client-Side Programming",
    desc: "JavaScript for dates, form validation, and interactive elements (text, radio, checkbox, etc.).",
    category: "Web Technology",
  },
  {
    id: 4,
    title: "Online Applications using PHP",
    desc: "Create dynamic online applications with PHP backend functionality and server-side processing.",
    category: "Web Technology",
  },
  {
    id: 5,
    title: "Online Application with Data Access",
    desc: "Develop comprehensive online applications with database integration and data management.",
    category: "Web Technology",
  },
  // Computer Networks Experiments
  {
    id: 6,
    title: "LAN Setup and Topology",
    desc: "Establish a Local Area Network and connect multiple LANs using static routing protocols.",
    category: "Computer Networks",
  },
  {
    id: 7,
    title: "RIP and OSPF Redistribution",
    desc: "Analyze network performance when redistributing routes between RIP and OSPF protocols.",
    category: "Computer Networks",
  },
  {
    id: 8,
    title: "Network Security Analysis",
    desc: "Assess vulnerabilities and implement comprehensive network security techniques.",
    category: "Computer Networks",
  },
  {
    id: 9,
    title: "Traffic Control",
    desc: "Implement traffic flow control mechanisms for network performance optimization.",
    category: "Computer Networks",
  },
  {
    id: 10,
    title: "Firewall Configuration",
    desc: "Configure, deploy, and analyze firewall rules in a complex network environment.",
    category: "Computer Networks",
  },
];

const webExpContainer = document.getElementById("web-experiments");
const networkExpContainer = document.getElementById("network-experiments");
const filterSelect = document.getElementById("filter-status");
const clearAllBtn = document.getElementById("clear-all");

function getCategoryIcon(category) {
  switch (category) {
    case "Web Technology":
      return "🌐";
    case "Computer Networks":
      return "🔗";
    default:
      return "📚";
  }
}

function updateProgress() {
  const completedCount = experiments.filter(
    (exp) => localStorage.getItem(`exp-${exp.id}`) === "true"
  ).length;

  const percentage = Math.round((completedCount / experiments.length) * 100);

  document.getElementById("complete-count").textContent = completedCount;
  document.getElementById("incomplete-count").textContent =
    experiments.length - completedCount;
  document.getElementById("progress-percentage").textContent = `${percentage}%`;
  document.getElementById("progress-bar").style.width = `${percentage}%`;
}

function loadDashboard() {
  const filterValue = filterSelect.value;
  webExpContainer.innerHTML = "";
  networkExpContainer.innerHTML = "";

  // Separate experiments by category
  const webExperiments = experiments.filter(
    (exp) => exp.category === "Web Technology"
  );
  const networkExperiments = experiments.filter(
    (exp) => exp.category === "Computer Networks"
  );

  // Apply filter
  let filteredWebExps = webExperiments;
  let filteredNetworkExps = networkExperiments;

  if (filterValue === "completed") {
    filteredWebExps = webExperiments.filter(
      (exp) => localStorage.getItem(`exp-${exp.id}`) === "true"
    );
    filteredNetworkExps = networkExperiments.filter(
      (exp) => localStorage.getItem(`exp-${exp.id}`) === "true"
    );
  } else if (filterValue === "incomplete") {
    filteredWebExps = webExperiments.filter(
      (exp) => localStorage.getItem(`exp-${exp.id}`) !== "true"
    );
    filteredNetworkExps = networkExperiments.filter(
      (exp) => localStorage.getItem(`exp-${exp.id}`) !== "true"
    );
  }

  // Render Web Technology experiments
  filteredWebExps.forEach((exp, index) => {
    const card = createExperimentCard(exp, index);
    webExpContainer.appendChild(card);
  });

  // Render Computer Networks experiments
  filteredNetworkExps.forEach((exp, index) => {
    const card = createExperimentCard(exp, index + filteredWebExps.length);
    networkExpContainer.appendChild(card);
  });

  updateProgress();
}

function createExperimentCard(exp, index) {
  const isDone = localStorage.getItem(`exp-${exp.id}`) === "true";

  const card = document.createElement("div");
  card.className = `glass-effect p-6 rounded-2xl shadow-lg card-hover border-l-4 w-full ${
    isDone ? "border-green-500" : "border-gray-300"
  }`;
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-start gap-4 flex-1">
              <span class="text-3xl mt-1">${getCategoryIcon(
                exp.category
              )}</span>
              <div class="flex-1">
                <h3 class="font-bold text-xl text-gray-800 mb-3">${exp.id}. ${
    exp.title
  }</h3>
                <p class="text-gray-600 leading-relaxed">${exp.desc}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center gap-4 md:min-w-[200px]">
              <div class="flex items-center gap-3">
                <input type="checkbox" ${isDone ? "checked" : ""} 
                       class="checkbox-custom" id="checkbox-${exp.id}">
                <div class="w-3 h-3 rounded-full ${
                  isDone ? "bg-green-500 animate-pulse-slow" : "bg-gray-300"
                }"></div>
              </div>
              
              <div class="flex flex-col items-center gap-2">
                <a href="${isDone ? `exp-${exp.id}/index.html` : "#"}" 
                   class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                     isDone
                       ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                       : "bg-gray-100 text-gray-400 cursor-not-allowed"
                   }" target="_blank">
                  ${isDone ? "📖 View Experiment" : "🔒 Complete to Unlock"}
                </a>
                <span class="text-sm font-medium ${
                  isDone ? "text-green-600" : "text-gray-500"
                }">
                  ${isDone ? "✅ Completed" : "⏳ Pending"}
                </span>
              </div>
            </div>
          </div>
        `;

  const checkbox = card.querySelector(`#checkbox-${exp.id}`);
  checkbox.addEventListener("change", () => {
    localStorage.setItem(`exp-${exp.id}`, checkbox.checked.toString());
    setTimeout(() => {
      loadDashboard();
      updateProgress();
    }, 200);
  });

  return card;
}

filterSelect.addEventListener("change", loadDashboard);

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all experiment progress?")) {
    experiments.forEach((exp) => {
      localStorage.removeItem(`exp-${exp.id}`);
    });
    loadDashboard();
  }
});

// Initialize dashboard
window.addEventListener("load", () => {
  setTimeout(loadDashboard, 100);
});
