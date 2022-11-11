import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import IVacation from "../models/IVacation";
import "./modal.css";
import "./EditModal.css";

function EditModal(props: any) {
  const { data } = props;
  const vacationId = data.id;
  const amountOfFollowers = data.amountOfFollowers;
  const isFollowed = data.isFollowed;
  const [destination, setDestination] = useState(data.destination);
  const [price, setPrice] = useState(data.price);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);

  //onChangeDestination function
  const onChangeDestination = (event: ChangeEvent<HTMLInputElement>): void => {
    let destination = event.target.value;
    destination.trim();
    console.log(destination);
    setDestination(destination);
  };

  // onChangePrice function
  const onChangePrice = (event: ChangeEvent<HTMLInputElement>): void => {
    let price = +event.target.value;
    console.log(price);
    setPrice(price);
  };

  // onChangeStartDate function
  const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>): void => {
    let startDate = event.target.value;
    startDate.trim();
    console.log(startDate);
    setStartDate(startDate);
  };

  // onChangeEndDate function
  const onChangeEndDate = (event: ChangeEvent<HTMLInputElement>): void => {
    let endDate = event.target.value;
    endDate.trim();
    console.log(endDate);
    setEndDate(endDate);
  };

  // onChangeImageUrl function
  const onChangeImageUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    let imageUrl = event.target.value;
    imageUrl.trim();
    console.log(imageUrl);
    setImageUrl(imageUrl);
  };

  //validate destination name function
  const validateDestinationName = () => {
    if (destination.length < 2 || destination == "" || destination == null) {
      alert("Please enter a valid destination name");
      return false;
    }
    return true;
  };

  //validate price function
  const validatePrice = () => {
    if (price < 1 || price == null) {
      alert("Please enter a valid price");
      return false;
    }
    return true;
  };

  //validate image url function
  const validateImageUrl = () => {
    if (imageUrl.length < 1 || imageUrl == "" || imageUrl == null) {
      alert("Please enter a valid image url");
      return false;
    }
    return true;
  };
  //validate start date function
  const validateStartDate = () => {
    if (startDate.length < 1 || startDate == "" || startDate == null) {
      alert("Please enter a valid start date");
      return false;
    }
    return true;
  };

  //validate end date function
  const validateEndDate = () => {
    if (endDate.length < 1 || endDate == "" || endDate == null) {
      alert("Please enter a valid end date");
      return false;
    }
    return true;
  };
  //on Clear Button Click function
  const onClearClicked = () => {
    setDestination("");
    setPrice(0);
    setStartDate("");
    setEndDate("");
    setImageUrl("");
  };

  //closeEditModal function
  const closeEditModalFunction = () => {
    props.closeEditModal(false);
  };

  const update = async () => {
    if (
      validateDestinationName() &&
      validatePrice() &&
      validateImageUrl() &&
      validateStartDate() &&
      validateEndDate()
    ) {
      const vacation: IVacation = {
        id: vacationId,
        destination: destination,
        price: price,
        startDate: startDate,
        endDate: endDate,
        imageUrl: imageUrl,
        amountOfFollowers: amountOfFollowers,
        isFollowed: isFollowed,
      };
      try {
        const { status } = await axios.patch(
          `http://localhost:3001/vacations/:${vacationId}`,
          vacation
        );

        if (status === 200) {
          window.location.reload();
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="editModalBackground">
      <div className="editModalContainer">
        <div
          style={{
            width: "12%",
            marginLeft: "auto",
          }}
        >
          <button
            className="editModalTitleCloseBtn"
            onClick={closeEditModalFunction}
          >
            X
          </button>
        </div>

        <div className="editModalTitle">
          <h4>Edit Vacation</h4>
        </div>
        <div className="editModalBody">
          <div className="destinationDiv">
            <div>
              <label htmlFor="destinationInput">Destination: </label>
            </div>
            <div>
              <input
                type="text"
                className="destinationInput"
                placeholder="Destination Name"
                onChange={onChangeDestination}
                value={destination}
              />
            </div>
          </div>
          <div className="priceDiv">
            <div>
              <label htmlFor="priceInput">Price: </label>
            </div>
            <div>
              <input
                type="number"
                value={price}
                className="priceInput"
                placeholder="Price"
                onChange={onChangePrice}
              />
            </div>
          </div>
          <div className="startDateDiv">
            <div>
              <label htmlFor="startDateInput">Start Date: </label>
            </div>
            <div>
              <input
                style={{
                  width: "38%",
                }}
                type="date"
                className="startDateInput"
                placeholder="Start Date"
                onChange={onChangeStartDate}
              />
            </div>
          </div>
          <div className="endDateDiv">
            <div>
              <label htmlFor="endDateInput">End Date: </label>
            </div>
            <div>
              <input
                style={{
                  width: "38%",
                }}
                type="date"
                className="endDateInput"
                placeholder="End Date"
                onChange={onChangeEndDate}
              />
            </div>
          </div>
          <div className="imageUrlDiv">
            <div>
              <label htmlFor="imageUrlInput">Image Url: </label>
            </div>
            <div>
              <input
                style={{
                  width: "38%",
                }}
                type="url"
                value={imageUrl}
                className="imageUrlInput"
                placeholder="Image Url"
                onChange={onChangeImageUrl}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="cancelBtn" onClick={closeEditModalFunction}>
              Cancel
            </button>
            <button className="cancelBtn" onClick={update}>
              UPDATE
            </button>
            <button
              style={{
                width: " 25%",
              }}
              className="clearBtn"
              onClick={onClearClicked}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
