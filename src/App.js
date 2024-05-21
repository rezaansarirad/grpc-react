import ConectionServer from "./components/ConectionServer";
import Header from "./components/templates/Header";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.main_holder}>
      <Header />

      <ConectionServer />
    </div>
  );
}

export default App;
