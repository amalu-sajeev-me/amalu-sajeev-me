class Link {
  constructor(name, url) {
    this.name = name;
    this.url = `https://${url}`;
  }
}

const links = [
  new Link("GitHub", "github.com/amalu-sajeev-me"),
  new Link("LinkedIn", "linkedin.com/in/amalu-sajeev-me"),
  new Link("Facebook", "facebook.com/amalu.sajeev.me"),
  new Link("Instagram", "instagram.com/amalu_sajeev"),
  new Link("Telegram", "t.me/amalu_sajeev_me"),
  new Link("Twitter", "twitter.com/amalu_sajeev"),
];
export default links;
