import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const TicketDetailsPackage = ({ isMobile, details }) => {
	return (
		<Box
			sx={{
				p: "30px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				algnItems: "flex-start",
				gap: "30px",
			}}
		>
			<Typography variant="h4">Package Summary</Typography>
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={5}
				sx={{ background: "#f0f0e8", p: "20px", borderRadius: "10px" }}
			>
				<Stack
					direction={isMobile ? "column" : "row"}
					justifyContent="space-between"
					alignItems="center"
					spacing={3}
					sx={{ width: "100%" }}
				>
					<img
						src={"/images/airlines/" + details.airline.split(" ")[0] + ".png"}
						alt="flight-logo"
						width="100vw"
					/>
					<Typography variant="h5" sx={{ color: "#252f86" }}>
						{details.leaving_from}
					</Typography>
					<img src="/images/departure-icon.png" alt="departure" width="40vw" />
					<Typography variant="h5" sx={{ color: "#252f86" }}>
						{details.going_to}
					</Typography>
				
				</Stack>
				
			</Stack>
			<Paper
				variant="outlined"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					pl: "30px",
					pr: "30px",
					pb: "20px",
					pt: "10px",
					borderRadius: "10px",
					border: "3px solid #b3b3b1",
				}}
			>
				<Typography
					variant="h5"
					sx={{ textDecoration: "underline", color: "#17a5f7" }}
				>
					Flight Details
				</Typography>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ width: "100%" }}
					spacing={15}
				>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="stretch"
						spacing={2}
						divider={<Divider />}
					>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ width: "100%" }}
						>
							<Typography variant="p">Airline: </Typography>
							<Typography variant="p">{details.airline}</Typography>
						</Stack>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ width: "100%" }}
						>
							<Typography variant="p">Travel From: </Typography>
							<Typography
								variant="p"
								fontFamily="Bahnschrift"
								sx={{ ml: "10px" }}
							>
								{details.leaving_from}
							</Typography>
						</Stack>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ width: "100%" }}
						>
							<Typography variant="p">Travel To: </Typography>
							<Typography
								variant="p"
								fontFamily="Bahnschrift"
								sx={{ ml: "10px" }}
							>
								{details.going_to}
							</Typography>
						</Stack>
			
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ width: "100%" }}
						>
							<Typography variant="p">Fare Amount: </Typography>
							<Typography variant="p">£ {details.total_fare}</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
};

export default TicketDetailsPackage;
