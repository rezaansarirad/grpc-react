import ConectionServer from "./components/ConectionServer";
import Header from "./components/templates/Header";
import styles from "./App.module.scss";
import PanelLayout from "./Layout/PanelLayout";

function App() {
  return (
    <div className={styles.main_holder}>
      <Header />
      <PanelLayout>
        <ConectionServer />
      </PanelLayout>
    </div>
  );
}

export default App;
