import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';


const headCells = [
  {
    id: '_id',
    numeric: true,
    disablePadding: true,
    label: 'default',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: true,
    label: 'Price',
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'numRatings',
    numeric: true,
    disablePadding: false,
    label: 'NumRating',
  },
  {
    id: 'model_year',
    numeric: true,
    disablePadding: false,
    label: 'modelYears',
  },
  {
    id: 'RAM',
    numeric: true,
    disablePadding: false,
    label: 'RAM',
  },
  {
    id: 'ROM',
    numeric: true,
    disablePadding: false,
    label: 'ROM',
  },


  // product assessment intent (stiftung warentest data)
  {
    id: 'camera_score',
    numeric: true,
    disablePadding: false,
    label: 'camera_score',
  },
  
  {
    id: 'battery_score',
    numeric: true,
    disablePadding: false,
    label: 'battery_score',
  },
  
  {
    id: 'Stability_score',
    numeric: true,
    disablePadding: false,
    label: 'Stability_score',
  },
  
  // rating with 4 strngs:  var rating_words_rank = ['sufficient','satisfactory','good','very good']
  // checkbox will be useful, ranking is not neccessary

  // Stiftungwaren test change their metric from 2018 to 2022, 
  // so some metrics are missing in old data: 
  //   1. music player score, 
  //   2. display score.

  // {
  //   id: 'music_player_score',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'music_player_score',
  // },

  // {
  //   id: 'display_score',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'display_score',
  // },
  
  
  // {
  //   id: 'surfing_rating',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'surfing_rating',
  // },
  
  // {
  //   id: 'backup_PC_rating',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'backup_PC_rating',
  // },
  
  // {
  //   id: 'computing_power_rating',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'computing_power_rating',
  // },
  
  // {
  //   id: 'instruction_for_use_rating',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'instruction_for_use_rating',
  // },
  
  // {
  //   id: 'network_sensitivity_rating',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'network_sensitivity_rating',
  // },
  
  // {
  //   id: 'biometric_unlock_rating',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'biometric_unlock_rating',
  // },
  
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.slice(props.start, props.end).map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
    </Toolbar>
  );
};



EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};





export default function EnhancedTable() {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('_id');
  const [selected, setSelected] = React.useState([]);

  const dispatch = useDispatch()

  const handleRequestSort = (event, property) => {
    
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    dispatch(updateAllFilterState({ 
      currentSortKey: property,
      currentSortValue: isAsc ? -1 : 1,
     }))

  };



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            // aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'}
          > 
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}       // asc or desc
              orderBy={orderBy}   //which feature are activated
              onRequestSort={handleRequestSort}
              start = {0}
              end = {5}
            />

            <EnhancedTableHead
              numSelected={selected.length}
              order={order}       // asc or desc
              orderBy={orderBy}   //which feature are activated
              onRequestSort={handleRequestSort}
              start = {5}
              end = {10}
            />

            {/* <EnhancedTableHead
              numSelected={selected.length}
              order={order}       // asc or desc
              orderBy={orderBy}   //which feature are activated
              onRequestSort={handleRequestSort}
              start = {10}
              end = {-1}
            /> */}

          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
