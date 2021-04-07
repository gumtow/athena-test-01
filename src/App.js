import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./StudentTable.json";

function App() {
  const [myData, setData] = useState([]);
  const [mySort, setSort] = useState(false);

  useEffect(() => {
    // Average test score sand add to data
    let newData = data.map((data) => {
      let avg = Math.round(
        (data.scores.test1 + data.scores.test2 + data.scores.test3) / 3
      );
      return { ...data, avg };
    });

    // create an array of averages and sort in reverse order
    let avgs = newData
      .map((data) => {
        return data.avg;
      })
      .sort()
      .reverse();

    // Add standing value based on the index of the sorted averages array
    newData = newData.map((data, i) => {
      let standing = avgs.indexOf(data.avg) + 1;
      return { ...data, standing };
    });

    // Sort the new data by standing
    mySort
      ? newData.sort((a, b) => (a.standing > b.standing ? -1 : 1))
      : newData.sort((a, b) => (a.standing > b.standing ? 1 : -1));

    // Set myData
    setData(newData);
  }, [mySort]);

 
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>Student Name</td>
            <td>Age</td>
            <td>Test1</td>
            <td>Test2</td>
            <td>Test3</td>
            <td>Avg</td>
            <td>
              <button onClick={() => setSort(!mySort)}>Standing</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {myData.map((data, i) => {
            return (
              <tr key={i}>
                <td>
                  {data.lastName}, {data.firstName}
                </td>
                <td>{data.age}</td>
                <td>{data.scores.test1}</td>
                <td>{data.scores.test2}</td>
                <td>{data.scores.test3}</td>
                <td>{data.avg}</td>
                <td>{data.standing}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
