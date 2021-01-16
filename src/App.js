import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
//Services
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
//Icons and Design
import Dropdown from 'react-bootstrap/Dropdown'
import Gear from './assets/iconmonstr-gear-1-240.png'
import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function App () {
  const [list, setList] = useState();
  const [fullList, setFullList] = useState();
  const [numberOfNews, setNumberOfNews] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  const handleChange = input => {
    const filtered = fullList && fullList.filter( e => {
      return e.category == input.target.value
    })
    setList(filtered)
    input.target.value == '' && setList(fullList)
  }
  
  useEffect( async () => {
    setLoading(true)
    console.log('===> Going for test...')
    const result = await Axios.get('http://localhost:4000/api/app')
    console.log('===> Result', result.data.result.length)
    setFullList(result.data.result)
    setList(result.data.result)
    setNumberOfNews(result.data.result.length)
    setLoading(false)
  }, []);

  const classes = useStyles();

  return (
     <Router>
    <div className="App">
      {loading && <ReactLoading type={"spokes"} color={'#FFC300'} height={'20%'} width={'20%'} />
      ||
      <>
        <nav>
          <Dropdown className="settings">
            <Dropdown.Toggle id="dropdown-basic">
              <img src={Gear} alt="" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.ItemText>{numberOfNews} News</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h1>Portugal News Updated</h1>
          <div>
            <Link to="/">
              <button className="categories" value='' onClick={handleChange}>Todas</button>
            </Link>
            <Link to="/politica">
              <button className="categories" value='politica' onClick={handleChange}>Política</button>
            </Link>
            <Link to="/economia">
              <button className="categories" value='economia' onClick={handleChange}>Economia</button>
            </Link>
            <Link to="/pais">
              <button className="categories" value='pais' onClick={handleChange}>País</button>
            </Link>
            <Link to="/mundo">
              <button className="categories" value='mundo' onClick={handleChange}>Mundo</button>
            </Link>
            <Link to="/tech">
              <button className="categories" value='tech' onClick={handleChange}>Tech</button>
            </Link>
            <Link to="/cultura">
              <button className="categories" value='cultura' onClick={handleChange}>Cultura</button>
            </Link>
            <Link to="/lifestyle">
              <button className="categories" value='lifestyle' onClick={handleChange}>Lifestyle</button>
            </Link>
          </div>
          <hr className="dotted"></hr>
        </nav>
        {list && list.map(e => 
        <>
          <h2>{e.title}</h2>
          <h5>{e.subtitle}</h5>
          <section>
            <div>
              {e.content.map(i => 
              <>
              <p>{i}</p>
              </>
              )}
            </div>
            <div>
              <img src={e.imgUrl} alt="" />
              <a href={e.url}>Source</a>
            </div>
          </section>
          <hr className="dotted"></hr>
        </>
        )}
        <Pagination count={10} color="primary" />
      </>
      }
      
    </div>
    </Router>
  );
}

export default App;
