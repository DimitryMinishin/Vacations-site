import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import AppState from "../store/AppState";
import { DialogTitle } from "@material-ui/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  })
);

export default function GraphPreview(props: any) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

  const handleClose = () => {
    props.setOpen(false);
  };

  let storedVacations = useSelector((state: AppState) => state.vacations);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        // text: "Chart.js Bar Chart",
      },
    },
  };

  let places;
  const labelArrayFunction = () => {
    const labels = storedVacations.map((currentVacation) => {
      return currentVacation.destination;
    });
    return labels;
  };

  places = labelArrayFunction();
  const numberArrayFunction = () => {
    const liked = storedVacations.map((currentVacation) => {
      return currentVacation.amountOfFollowers;
    });

    return liked;
  };
  const likedNumber = numberArrayFunction();
  const data = {
    labels: places,
    datasets: [
      {
        label: "Liked  Vacations",
        data: likedNumber,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title"
          style={{
            width: "4%",
            marginLeft: "auto",
          }}
        >
          <button onClick={handleClose}>X</button>
        </DialogTitle>
        <DialogContent>
          <Bar options={options} data={data} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
