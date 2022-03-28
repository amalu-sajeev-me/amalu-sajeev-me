class Skill {
  constructor(name, type = null) {
    this.name = name;
    this.type = type === 1 ? `FrontEnd` : `BackEnd`;
  }
  static create(name, type) {
    return new Skill(name, type);
  }
}

const skills = [
  Skill.create("html", 1),
  Skill.create("css", 1),
  Skill.create("javascript", 1),
  Skill.create("jquery", 1),
  Skill.create("nodejs", 0),
  Skill.create("express", 0),
  Skill.create("mongodb", 0),
];

export default skills;
