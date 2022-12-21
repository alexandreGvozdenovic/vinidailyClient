import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";

const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImg = styled("img")`
  width: 200px;
  height: auto;
`;

const StyledInput = styled("input")`
  margin-bottom: 32px;
`;

function App() {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [search, setSearch] = useState("");

  console.log("wines", wines);
  const getData = async () => {
    const data = await Axios.get("/wines");
    setWines(data.data.data);
    setFilteredWines(data.data.data);
    console.log("DATA", data);
  };

  const searchFilter = (search) => {
    console.log("search", search);
    const filtered = wines.filter((wine) =>
      wine.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filtered);
    setFilteredWines(filtered);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <StyledContainer className="App">
      <h1>El vino</h1>
      <StyledInput onChange={(e) => searchFilter(e.target.value)} />
      {filteredWines.map((wine) => {
        return (
          <div>
            <p>{wine.name}</p>
            <StyledImg src={wine.logo} />
          </div>
        );
      })}
    </StyledContainer>
  );
}

export default App;
