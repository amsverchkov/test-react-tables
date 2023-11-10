import styles from './App.module.css';
import { FileLoadForm } from '../file-load-form/file-load-form';

function App() {
  return (
    <div className={styles['content_wrapper']}>
      <FileLoadForm />
    </div>
  );
}

export default App;
