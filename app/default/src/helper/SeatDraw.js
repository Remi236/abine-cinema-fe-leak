const draw2DArray = (width, height, BookedCode) => {
  // var arrayRows = [];
  console.log('BookedCode:', BookedCode);
  const Acomulator = 65;
  // let no = 0;
  // let isHaveKeys = Object.keys(BookedCode).length !== 0;
  // console.log('Key: ', isHaveKeys);
  // for (var i = 0; i < width; i++) {
  //   var arrayCols = [];
  //   for (var j = 0; j < height; j++) {
  //     ++no;
  //     const KEY_AXIS = `${String.fromCharCode(Acomulator + i)}`;
  //     let element = {};
  //     // console.log('KEY: ', KEY_AXIS, ' No: ', no);
  //     if (isHaveKeys) {
  //       const key = Object.keys(BookedCode)[0];
  //       console.log("Obj: ",Object.keys(BookedCode));
  //       console.log('Key: ', key);
  //       const occupied = BookedCode[key][j + 1]
  //         ? BookedCode[key][j + 1]
  //         : false;
  //       console.log('OC: ', occupied);
  //       console.log('BookedSeat:', BookedCode[key][j + 1]);
  //       element = {
  //         seatCode: `${KEY_AXIS}${j + 1}`,
  //         occupied,
  //       };
  //     } else {
  //       element = {
  //         seatCode: `${KEY_AXIS}${j + 1}`,
  //       };
  //     }

  //     arrayCols.push(element);
  //   }
  //   arrayRows.push({ rows: arrayCols });
  // }
  const res = [];
  for (let i = 0; i < height; i++) {
    const arr = [];
    for (let j = 0; j < width; j++) {
      const rowChar = `${String.fromCharCode(Acomulator + i)}`;
      const colAxis = j + 1;

      // console.log(rowChar, colAxis);
      // console.log(seats[rowChar], rowChar);

      const seat = {
        seatCode: `${rowChar}${colAxis}`,
        occupied: !!(BookedCode[rowChar] && BookedCode[rowChar][colAxis]),
      };

      arr.push(seat);
    }
    res.push(arr);
  }
  return res;
  // console.log(arrayRows);
  // return arrayRows;
};

export { draw2DArray };
