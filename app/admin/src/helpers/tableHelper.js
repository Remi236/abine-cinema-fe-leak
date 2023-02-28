const minRows = 20;
const maxRows = 41;

const availlabelType = ["string", "int", "float"]; 

const getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()- start.getTime()))).toLocaleDateString();

const getRowsBySearchTerm = (searchTerm, rows, field, type) => {
  let rowsSearch = [];
  switch (type) {
    case availlabelType[0]:
      rowsSearch = rows.filter(item => {
      return item[field].toLowerCase().includes(searchTerm.toLowerCase());
      });
      break;
    case availlabelType[1]:
      rowsSearch = rows.filter(item => item[field] >= parseInt(searchTerm));
      break;
    case availlabelType[2]:
      rowsSearch = rows.filter(item => item[field] >= parseFloat(searchTerm));
      break;
    default:
      rowsSearch = [...rows];
      break;
  }
  return rowsSearch;
}

const createRows = (min = minRows , max = maxRows ) => {
  const rowsCount = Math.round( Math.random() * (min + max));
  let rows = [];
  for (let i = 1; i < rowsCount + 1; i++) {
    rows.push({
      id: i,
      first: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
      last: ['Morisson', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
      user: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
      age: Math.min(100, Math.round(Math.random() * 30) + 20),
      date: getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
      location: ['Melbourne', 'Tokio', 'Moscow', 'Rome'][Math.floor((Math.random() * 4))],
      work: ['Nova Soft', 'Dog Shop', 'Aspirity', 'Business Bro', 'Starlight'][Math.floor((Math.random() * 5))],
      action: i,
    });
    // console.log(rows);

  }
  return rows;
};

const filterRows = (originalRows, pageNumber = 1, rowsOnPage = 10) => {
  const rowsFrom = rowsOnPage * (pageNumber - 1);
  const rowsTo = rowsFrom + rowsOnPage;
  return originalRows.slice(rowsFrom, rowsTo);
};

const getDataRows = (rowIdxSelected, rowSelecter) => {
  // console.log(rowIdxSelected,rowSelecter);
  // row = {...row, className:"rowSelected"};
  return rowSelecter;
}

export {
  // changPage,
  createRows,
  filterRows,
  getRowsBySearchTerm,
  getDataRows,
}