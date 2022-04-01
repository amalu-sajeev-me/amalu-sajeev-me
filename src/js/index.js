import { fillWithElements } from "./main.js";
import { Router } from "./router.js";
import skills from "../db/skills.js";
import links from "../db/links.js";
import education from "../db/education.js";
import { makeElement } from "./utils/makeElement.js";
import { HashRouter } from "./utils/HashRouter.js";

(function () {
  let code = document.getElementById("code");
  let text = `‹〴› coding....`;
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      code.innerHTML += text[i];
    }, 280 * i);
  }
})();

fillWithElements(`skills`, skills, {
  wrapper: [
    "a",
    (skill) => ({
      href: `#${skill.name}`,
      class: `dialog`,
    }),
  ],
  className: `skill`,
  html: (skill) => skill.name,
});

fillWithElements(`projects`, ["copola"]);

fillWithElements(`links`, links, {
  className: "link",
  wrapper: [
    "a",
    (link) => ({
      href: link.url,
      target: "blank",
    }),
  ],
  html: (link) => link.name,
});

fillWithElements(`education`, education, {
  wrapper: ["div", (school) => ({})],
  className: "school",
  html: ({ name, description, course, duration }) => {
    return `
      <div class='title'>
      <h4>School/Organization</h4>
        ${name} 
        ${description !== null ? `<br /> ${description}` : ""}
      </div>
      <h5>${course}</h5>
      <div class='seperator'>
        <div>☉</div>
        <div class='line'>|</div>
        <div>☉</div>
      </div>
    `;
  },
}).append(
  (function () {
    let dob = document.createElement("div");
    dob.classList.add("tiles");
    dob.innerHTML = "May 1998";
    return dob;
  })()
);

// Router.initialize();
/*
const dialogRouter = new Router("dialog");
dialogRouter.setRoute("html", "<b>this is html5 here, Alas!<b>");

const resumeRouter = new Router("resume");
resumeRouter.setRoute(
  "resume",
  `<embed type="application/pdf" src="./resume.pdf" >`
);

Router.initialize();

*/

HashRouter.initialize();
let mySkills = new HashRouter("myskills");

const resume = makeElement("embed").addProps({
  src: "./resume.pdf",
  type: "application/pdf",
});
mySkills
  .route("html", "HYPER TEXT MARKUP LANGUAGE")
  .route("css", "CASCADING STYLE SHEETS")
  .route("resume", resume.outerHTML);
