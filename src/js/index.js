import { connectToDatabase } from "./main.js";
import { Hash, MarkupMaker } from "./utils/index.js";

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
await connectToDatabase();
const { skills, projects, education, links } = internalDB.collections;

const skillsContainer = document.getElementById("skills");
skills.forEach(({ name }) => {
  const props = { href: `#${name}`, class: `tiles` };
  new MarkupMaker("a", { props }, skillsContainer, [name]).html;
});

const projectsContainer = document.getElementById("projects");
projects.forEach(({ name, link }) => {
  const props = { href: `${links.website}`, class: `tiles` };
  new MarkupMaker("a", { props }, projectsContainer, [name]).html;
});

const linksContainer = document.getElementById("links");
links.forEach(({ name, url }) => {
  const props = { href: `#${url}`, class: `tiles` };
  new MarkupMaker("a", { props }, linksContainer, [name]).html;
});

const educationContainer = document.getElementById("education");
education.forEach(({ name, description, course, duration }) => {
  const wrapper = new MarkupMaker("div", {}, educationContainer);
  wrapper.addClass(["school", "tiles"]);

  const title = new MarkupMaker("div", {}, wrapper.html).addClass("title").html;
  new MarkupMaker("h4", {}, title, ["School/Organization"]).html;
  new MarkupMaker("div", {}, title, [name]).html;
  new MarkupMaker("h5", {}, wrapper.html, [course]).html;
  const seperator = `<div>☉</div><div class='line'>|</div><div>☉</div>`;
  new MarkupMaker("div", {}, wrapper.html, seperator).html;
});

new MarkupMaker("div", {}, educationContainer, "May 1998").addClass("tiles")
  .html;

/**
 * INTERNAL HASH ROUTING
 */

Hash.initialize();

const mySkills = new Hash("skills");
const resume = new MarkupMaker("embed").addProps({
  src: "./resume.pdf",
  type: "application/pdf",
});

mySkills
  .route("html", "<b>hypertext markup language</b> yess!")
  .route(
    "css",
    new MarkupMaker("div", { children: ["cascading stylesheets"] }).html
  )
  .route("resume", resume)
  .route("contact_page", { template: "/pages/contact.html" });
