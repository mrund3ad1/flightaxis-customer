import {
	Box,
	Button,
	Dialog,
	DialogContent,
	FormControl,
	IconButton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import AutocompleteAirports from "../regform/AutocompleteAirports";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { sendQuote } from "../../assets/api/api";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const GetAQuoteDialog = ({ isMobile, open, setOpen }) => {
	/* const handleClickOpen = () => {
		setOpen(true);
	}; */

	const [formData, setFormData] = useState({
		name:"",
		customer_email:"",
		customer_phone:"",
		no_of_passengers:"",
		departing_on:"",
		returning_on:""
	})
		
	const [booked, setBooked] = useState(false);


	const handleClose = () => {
		setBooked(false)
		setOpen(false);
	};

	const handleFormChange = (event) => {
		const {name, value} = event.target;
		setFormData((prev)=>{
			return {
				...prev,
				[name]:value
			}
		})

	}


	const handleAirportChange = (name, value) => {
		console.log(name);
		setFormData((prev) => {
		  return {
			...prev,
			[name]: value,
		  };
		});
	  };

	const handleBookingSubmit = () => {
		if (Object.values(formData).some((value) => value === "")) {
			alert("Please fill in all the fields");
		  } else {
		sendQuote({
			...formData,

		})
		.then((result)=>setBooked(true))
		.catch((error)=>alert("An error occured, try again"))
		}
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent
				sx={{
					p: "35px",
					background: "rgb(70,174,247)",
					background:
						"linear-gradient(-180deg, rgba(70,174,247,1) 77%, rgba(70,174,247,0) 100%)",
				}}
			>
				{
					booked ? 
				<div style={{
					display:"flex",
					 flexDirection:"column",
					 alignItems:"center",
					 gap:"1rem",
					 margin:"2rem 0"
				}}>
				<CheckCircleIcon sx={{fontSize:"5rem", color:"green"}}/>
				<div style={{
					display:"flex",
					 flexDirection:"column",
					 alignItems:"center"}}>
						<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
						}}
					>
						<CancelRoundedIcon sx={{ color: "#d2d4d3" }} />
					</IconButton>
				<h2> 
					
					Booking request received
					
				</h2>	
					<p>We'll get back to you on your email or phone</p>
				</div>
				</div>
				:
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={2}
					sx={{ position: "relative" }}
				>
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							top: -15,
							right: -15,
						}}
					>
						<CancelRoundedIcon sx={{ color: "#d2d4d3" }} />
					</IconButton>
					<Box
						sx={{
							background: "url('/images/diamond-shape.png')",
							backgroundSize: "100% 100%",
							backgroundRepeat: "no-repeat",
							p: "30px",
							gap:"0.4rem",
							display: "flex",
							justifyContent: "center",
							alignitems: "center",
						}}
					>
						<Typography
							variant={isMobile ? "h6" : "h5"}
							sx={{ fontFamily: "cursive", color: "white" }}
						>
							Request Call Back
						</Typography>
					</Box>

					<FormControl fullWidth>
						<Stack direction="column" justifyContent="flex-start">
							<Typography variant="subtitle2">Name</Typography>
							<TextField
								placeholder="Name"
								id="outlined-start-adornment"
								size="small"
								sx={{
									m: 1,
									"& input::placeholder": {
										fontSize: "11px",
										width: "100%",
									},
								}}
								name={"name"}
								value={formData.name}
								onChange={handleFormChange}
							/>
						</Stack>
						<Stack direction="column" justifyContent="flex-start">
							<Typography variant="subtitle2">Phone number</Typography>
							<TextField
								placeholder="Phone number"
								id="outlined-start-adornment"
								size="small"
								sx={{
									m: 1,
									"& input::placeholder": {
										fontSize: "11px",
										width: "100%",
									},
								}}
								name={"customer_phone"}
								value={formData.customer_phone}
								onChange={handleFormChange}
							/>
						</Stack>
						<Stack direction="column" justifyContent="flex-start">
							<Typography variant="subtitle2">Email</Typography>
							<TextField
								placeholder="Email"
								id="outlined-start-adornment"
								size="small"
								type="email"
								sx={{
									m: 1,
									"& input::placeholder": {
										fontSize: "11px",
										width: "100%",
									},
								}}
								name={"customer_email"}
								value={formData.customer_email}
								onChange={handleFormChange}
							/>
						</Stack>
						<Stack direction="column" justifyContent="flex-start">
							<Typography variant="subtitle2">No of passengers</Typography>
							<TextField
								placeholder="Number of Passengers"
								id="outlined-start-adornment"
								size="small"
								type="number"
								sx={{
									m: 1,
									"& input::placeholder": {
										fontSize: "11px",
										width: "100%",
									},
								}}
								name={"no_of_passengers"}
								value={formData.no_of_passengers}
								onChange={handleFormChange}
							/>
						</Stack>
						<Stack direction="column" justifyContent="flex-start">
							<Typography variant="subtitle2">Flying From</Typography>
							<AutocompleteAirports
							setValue={handleAirportChange}
							name="leaving_from"
							/>
						</Stack>
						<Stack direction="column" justifyContent="flex-start">
							<Typography variant="subtitle2">Going To</Typography>
							<AutocompleteAirports
							setValue={handleAirportChange}
							name="going_to"
							/>
						</Stack>
						<Stack
							direction={isMobile ? "column" : "row"}
							justifyContent="center"
							alignItems="center"
							sx={{ width: "100%" }}
						>
							<Stack
								direction="column"
								justifyContent="flex-start"
								sx={{ width: "100%" }}
							>
								<Typography variant="subtitle2">Departure Date</Typography>
								<TextField
									placeholder="Departure date"
									id="outlined-start-adornment"
									size="small"
									type="date"
									sx={{
										m: 1,
										"& input::placeholder": {
											fontSize: "11px",
											width: "100%",
										},
									}}
									name="departing_on"
									value={formData.departing_on}
									onChange={handleFormChange}
								/>
							</Stack>
							<Stack
								direction="column"
								justifyContent="flex-start"
								sx={{ width: "100%" }}
							>
								<Typography variant="subtitle2">Return Date</Typography>
								<TextField
									placeholder="Return date"
									id="outlined-start-adornment"
									size="small"
									type="Date"
									sx={{
										m: 1,
										"& input::placeholder": {
											fontSize: "11px",
											width: "100%",
										},
									}}
									name="returning_on"
									value={formData.returning_on}
									onChange={handleFormChange}
								/>
							</Stack>
						</Stack>
					</FormControl>
					<Button  onClick={handleBookingSubmit} variant="contained" sx={{ borderRadius: "10px", p: "10px" }}>
						Get Instant Quote
					</Button>
				</Stack>
			}
			</DialogContent>
		</Dialog>
	);
};

export default GetAQuoteDialog;
