import stylex from "@ladifire-opensource/stylex";
import logo from "./logo.svg";

const styles = stylex.create({
  app: {
    textAlign: "center",
  },
  appLogo: {
    height: "40vmin",
    pointerEvents: "none",
    animationDuration: "20s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    }),
  },
  appHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  appLink: {
    color: "#61dafb",
  },
});

function App() {
  return (
    <div className={stylex(styles.app)}>
      <header className={stylex(styles.appHeader)}>
        <img src={logo} className={stylex(styles.appLogo)} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={stylex(styles.appLink)}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
