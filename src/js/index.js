import skills from "../db/skills.js";

(function () {
  let code = document.getElementById("code");
  let text = `‹〴› coding....`;
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      code.innerHTML += text[i];
    }, 280 * i);
  }
})();

function fillWithElements(id, data, options) {
  const target = document.getElementById(id);
  const defaultOptions = {
    className: null,
    html: (val) => val,
  };
  Object.assign(defaultOptions, arguments[2]);
  const { className = "empty", html } = defaultOptions;
  data
    .map((elem) => {
      let div = document.createElement(`div`);
      className && div.classList.add(className);
      div.classList.add("tiles");
      div.innerHTML = html(elem);
      return div;
    })
    .forEach((elem) => target.append(elem));
}

fillWithElements(`skills`, skills, {
  className: `skill`,
  html: (skill) => skill.name,
});

fillWithElements(`projects`, ["copola"]);
let links = ["GitHub", "Facebook", "Instagram", "Telegram", "Twitter"];
fillWithElements(`links`, links, {
  className: "link",
});
let education = [
  {
    name: "MSMHSS Chathinamkulam",
    description: "10th",
    course: "SSLC",
    duration: [null, 2014],
  },
  {
    name: "MSMHSS Chathinamkulam",
    description: "12th",
    course: "PlusTwo",
    duration: [null, 2014],
  },
  {
    name: "ITI Chandanathoppe",
    description: "Computer Operator & Programming Assistant",
    course: "COPA",
    duration: [null, 2018],
  },
];

fillWithElements(`education`, education, {
  className: "school",
  html: ({ name, description, course, duration }) => {
    return `
      <div class='title'>
      <h4>School/Organization</h4>
        ${name} 
        ${description !== null ? `<br /> ${description}` : ""}
      </div>
      <h5>${course}</h5>
    `;
  },
});