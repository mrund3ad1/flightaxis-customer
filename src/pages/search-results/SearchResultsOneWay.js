import React, { useEffect } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import GetAQuote from "../../components/getaquotedialog/GetAQuote";

const SearchResultsOneWay = ({ isMobile }) => {
	const navigate = useNavigate();
	useEffect(()=>window.scrollTo(0, 0)
	, [])
	const { state } = useLocation();

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let departing_on = state.formData.departing_on.split("-");

	let departing_fare = 0;

	let departing_month = months[parseInt(departing_on[1]) - parseInt(1)];

	departing_on =
		departing_month + " " + departing_on[2] + ", " + departing_on[0];

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={2}
			sx={{ width: "100%", background: "#f0f0e8", pt: "30px", pb: "30px" }}
		>
			<Stack
				direction="row"
				justifyContent={"center"}
				alignItems="center"
				sx={{ width: "100%" }}
			>
				<Box
					sx={{
						background: "#36bdf1",
						height: "10px",
						borderTopRightRadius: "10px",
						borderBottomRightRadius: "10px",
						width: "80%",
					}}
				/>
				<Typography
					variant={isMobile ? "h5" : "h3"}
					textAlign="center"
					sx={{ width: "100%" }}
				>
					From {state.formData.leaving_from.split(",")[0]}{" "}
					<span style={{ color: "#252f86" }}>To</span>{" "}
					{state.formData.going_to.split(",")[0]}
				</Typography>
				<Box
					sx={{
						background: "#36bdf1",
						height: "10px",
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
						width: "80%",
					}}
				/>
			</Stack>

			{
				state.flights.length !== 0 ? (
					state.flights.map((flight) => {
						return (
							<Paper
								elevation={2}
								sx={{
									p: "30px",
									borderRadius: "10px",
									width: isMobile ? "70vw" : "80vw",
								}}
							>
								<Stack
									direction="column"
									justifyContent="center"
									alignItems="center"
									spacing={5}
								>
									<Stack
										direction={isMobile ? "column" : "row"}
										justifyContent="space-between"
										alignItems="center"
										spacing={3}
										sx={{ width: "100%" }}
									>
										<img
											src={
												"/images/airlines/" +
												flight.airline.split(" ")[0] +
												".png"
											}
											alt="flight-logo"
											width={isMobile ? "150vw" : "200vw"}
										/>
										<Typography variant="h4" sx={{ color: "#252f86" }}>
											{flight.leaving_from.split(",")[0]}
										</Typography>
										<img
											src="/images/departure-icon.png"
											alt="departure"
											width={isMobile ? "70vw" : "100vw"}
											style={{ marginRight: isMobile ? 0 : "40px" }}
										/>
										<Typography variant="h4" sx={{ color: "#252f86" }}>
											{flight.going_to.split(",")[0]}
										</Typography>
										<Stack
											direction="column"
											justifyContent="center"
											alignItems="center"
											spacing={1}
											sx={{ mr: "20px" }}
										>
											<Typography variant="p" sx={{ color: "#17a5f7" }}>
												DEPARTURE
											</Typography>
											<Typography variant="p">{departing_on}</Typography>
										</Stack>
									</Stack>
									<Stack
										direction="column"
										justifyContent="center"
										alignItems="center"
									>
										<img
											src="/images/exclusive-offer.png"
											alt="offer"
											width="180vw"
										/>
										<Typography
											variant="subtitle1"
											textAlign="center"
											fontFamily="Bahnschrift"
										>
											Total Fare
										</Typography>
										<Typography
											variant="subtitle1"
											textAlign="center"
											fontFamily="Bahnschrift"
										>
											{flight.months_fare.filter((fare) => {
												if (fare.month === departing_month) {
													departing_fare = fare.leaving_fare;
												}
											})}
											£ {parseInt(departing_fare)}
										</Typography>
									</Stack>
									<Stack
										direction={isMobile ? "column" : "row"}
										justifyContent="center"
										alignItems="center"
										spacing={3}
										sx={{ width: "100%" }}
									>
										<Button
											variant="contained"
											sx={{
												background:
													"radial-gradient(circle, rgba(70,174,247,1) 0%, rgba(29,213,230,1) 100%)",
												width: "100%",
											}}
											onClick={() => {
												navigate("/summary", {
													state: {
														airline: flight.airline,
														leaving_from: flight.leaving_from,
														going_to: flight.going_to,
														departing_on: departing_on,
														returning_on: null,
														fare: parseFloat(departing_fare),
														adults: state.formData.adults,
														kids: state.formData.kids,
														infants: state.formData.infants,
														no_of_passengers:
															parseInt(state.formData.adults) +
															parseInt(state.formData.kids) +
															parseInt(state.formData.infants),
													},
												});
											}}
										>
											<Typography
												variant="h6"
												sx={{ fontFamily: "Bahnschrift" }}
											>
												Book now
											</Typography>
										</Button>
										<Box
											display="flex"
											direction="row"
											justifyContent="center"
											alignItems="center"
											sx={{
												width: "30%",
												border: "2px dotted #1ed4e6",
												borderRadius: "20px",
												p: "5px",
											}}
										>
											<Typography sx={{ fontFamily: "Bahnschrift" }}>
												OR
											</Typography>
										</Box>
										<Button
											variant="contained"
											sx={{
												background:
													"radial-gradient(circle, rgba(70,174,247,1) 0%, rgba(29,213,230,1) 100%)",
												width: "100%",
											}}
										>
											<Typography
												variant="h6"
												sx={{ fontFamily: "Bahnschrift" }}
												onClick={() => {
													window.open("tel:+1234567890");
												}}
											>
												Call 02032871426
											</Typography>
										</Button>
									</Stack>
								</Stack>
							</Paper>
						);
					})
				) : (
					<div>
						{" "}
						<GetAQuote />
					</div>
				)
				// <GetAQuoteDialog open={true} />
			}
		</Stack>
	);
};

export default SearchResultsOneWay;
