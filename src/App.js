
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import  Table from './Table'
import { sortData } from './utils';
import LineGraph from './LineGraph';


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('WorldWide')
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])
  const [mapCenter,setMapCenter] = useState([51.505, -0.09])
  const [mapZoom,setMapZoom] = useState(3)

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          const sortedData = sortData(data)
          setCountries(countries)
          setTableData(sortedData)
        })
    }
    getCountriesData()
  }, [])
 
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data)=>{
      setCountryInfo(data)
    })
  },[])

  const handleChange = (e) => {
    const countryCode = e.target.value

    const url = countryCode === 'WorldWide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data)
      setCountry(countryCode)
    })
   
  }
  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select variant="outlined" value={country} onChange={handleChange}>
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <h3 className="app__graphline">Worldwide new cases</h3>
          <LineGraph />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

