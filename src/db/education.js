class Education {
  constructor(school, course, duration) {
    [this.name, this.description] = school;
    this.course = course;
    this.duration = duration;
  }
}
const education = [
  new Education(["MSMHSS Chathinamkulam", "10th"], "SSLC", [null, 2014]),
  new Education(["MSMHSS Chathinamkulam", "12th"], "PlusTwo", [null, 2014]),
  new Education(
    ["ITI Chandanathoppe", "Computer Operator & Programming Assistant"],
    "COPA",
    [null, 2014]
  ),
];

export default education;
