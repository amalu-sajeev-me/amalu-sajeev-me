import "./Header.css";

export default function Header(props) {
  return (
    <header>
      <span id="logo">@amalu_sajeev</span>
      <nav>
        <a href="#about">about</a>
        <a href="#projects">projects</a>
        <a href="#contact">contact</a>
      </nav>
    </header>
  );
}
