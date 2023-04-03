import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function App() {
  const { t, i18n } = useTranslation();

  const clickHandle = event => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div className="App">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Languages</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={i18n.language}
          label="Languages"
          onChange={clickHandle}
          >
          <MenuItem value={'en'}>en</MenuItem>
          <MenuItem value={'tr'}>tr</MenuItem>
        </Select>
      </FormControl>
      <p>Aktif dil: {i18n.language}</p>
      <Link to="/terminals">terminals</Link>
    </div>
  );
}

export default App;
