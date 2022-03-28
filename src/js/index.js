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
  const { className = "empty", html } = options;
  data
    .map((elem) => {
      let div = document.createElement(`div`);
      div.classList.add(className);
      div.classList.add("tiles");
      div.innerHTML = html(elem);
      return div;
    })
    .forEach((elem) => target.append(elem));
}

fillWithElements(`skills`, skills, {
  className: `skill`,
  html(skill) {
    return skill.name;
  },
});

fillWithElements(`projects`, ["copola"], {
  html(project) {
    return project;
  },
});
