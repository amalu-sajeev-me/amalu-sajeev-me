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

/**
 * RENDERING HTML ELEMENTS
 */

const skillsContainer = document.getElementById("skills");
skills.forEach((skill) => {
  const options = { parentElem: skillsContainer, html: skill.name };
  const attributes = { href: `#${skill.name}`, class: `tiles` };
  makeElement("a", options).addProps(attributes);
});

const projects = ["copola"];
const projectsContainer = document.getElementById("projects");
projects.forEach((project) => {
  const options = { parentElem: projectsContainer, html: project };
  const attributes = { href: `#${project}`, class: `tiles` };
  makeElement("a", options).addProps(attributes);
});

const linksContainer = document.getElementById("links");

links.forEach((link) => {
  const options = { parentElem: linksContainer, html: link.name };
  const attributes = { href: `#${link.url}`, class: `tiles` };
  makeElement("a", options).addProps(attributes);
});

const educationContainer = document.getElementById("education");
education.forEach(({ name, description, course, duration }) => {
  const educationWrapper = makeElement("div", {
    parentElem: educationContainer,
  }).addProps("class", "school");
  educationWrapper.classList.add("tiles");
  const title = makeElement("div", { parentElem: educationWrapper }).addProps(
    "class",
    "title"
  );
  const heading = makeElement("h4", {
    parentElem: title,
    html: "School/Organization",
  });
  const content = makeElement("div", { parentElem: title, html: `${name}` });
  const subHeading = makeElement("h5", {
    parentElem: educationWrapper,
    html: `${course}`,
  });
  const seperator = makeElement("div", {
    parentElem: educationWrapper,
    html: `<div>☉</div><div class='line'>|</div><div>☉</div>`,
  });
});
makeElement("div", {
  parentElem: educationContainer,
  html: "May 1998",
}).addProps("class", "tiles");

/**
 * INTERNAL HASH ROUTING
 */

HashRouter.initialize();
let mySkills = HashRouter.makeNew("my skills");

const resume = makeElement("embed").addProps({
  src: "./resume.pdf",
  type: "application/pdf",
});
mySkills
  .route("html", "HYPER TEXT MARKUP LANGUAGE")
  .route("css", "CASCADING STYLE SHEETS")
  .route("resume", resume);
