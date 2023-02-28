import React, {useContext} from 'react';
import DataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import {ThemeContext} from '../../contexts/theme.Context';

const DataPaginationTable = ({ rows, heads, onSorting, onRowClick } ) => { 

  const rowGetter = i => rows[i];
  // heads = heads.map(c => ({ ...c,  sortDescendingFirst: ""}));
  const {isLightTheme} = useContext(ThemeContext);
  return (
    <div className="table table--bordered">
      <DataGrid
        className={isLightTheme ? "rdg-light" : "rdg-dark"}
        rows={rows}
        columns={heads}
        rowGetter={rowGetter}
        rowsCount={rows.length}
        rowHeight={44}
        minColumnWidth={100}
        onSort={onSorting}
        onRowClick={onRowClick}
      />
    </div>
  );
}

DataPaginationTable.propTypes = {
  heads: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    editable: PropTypes.bool,
    sortable: PropTypes.bool,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSorting: PropTypes.func.isRequired,
};


export default DataPaginationTable;