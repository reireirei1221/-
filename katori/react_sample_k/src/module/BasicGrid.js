import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LineChartButton from './LineChartButton';
import CityGraph from './city';
// import BubbleGraph from './Bubble';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(flag, food_code) {
  // console.log(flag);
  // console.log("food_code, basicgrid", flag.food_code);
  // console.log("flag", flag.flag)
  if (flag.flag === "f") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>食材選択</Item>
          </Grid>
          <Grid item xs={6}>
            <Item><LineChartButton/></Item>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item><img src="japan.png" width="500" height="400"/></Item>
          </Grid>
          <Grid item xs={6}>
            <Item><CityGraph food_code={flag.food_code}/></Item>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
}