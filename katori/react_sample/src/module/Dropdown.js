import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [color, setColor] = React.useState('');

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <Box sx={{ width: 200, margin:3}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">色選択</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={color}
          label="Color"
          onChange={handleChange}
        >
          <MenuItem value={"choose"} id="choose">--色を選択してください--</MenuItem>
          <MenuItem value={"blue"} id="blue">Blue</MenuItem>
          <MenuItem value={"orange"} id="orange">Orange</MenuItem>
          <MenuItem value={"green"} id="green">Green</MenuItem>
          <MenuItem value={"red"} id="red">Red</MenuItem>
          <MenuItem value={"purple"} id="purple">Purple</MenuItem>
          <MenuItem value={"all"} id="all">All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}