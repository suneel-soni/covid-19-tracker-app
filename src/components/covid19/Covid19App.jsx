import React from "react";
import { Cards, Chart, CountryPicker } from "./files";
import styles from "./Covid19App.module.css";
import { fetchData } from "./api";
import covid19logo from "./img/covid-19-logo.jpg";

class Covid19App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async country => {
    console.log(country);
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={covid19logo} alt="Covid-19 logo" className={styles.logo} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default Covid19App;
