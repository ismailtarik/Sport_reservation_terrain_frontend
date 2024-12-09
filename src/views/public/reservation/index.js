import React, { useState } from "react";
import axios from "axios";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import ReservationService from "../../../services/ReservationService";

function Reservation() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    // Form state
    const [terrainId, setTerrainId] = useState("");
    const [reservedBy, setReservedBy] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Debugging: Log form data
        console.log("Form Data Submitted:", {
            terrainId,
            reservedBy,
            reservationDate,
            phoneNumber,
        });

        try {
            await ReservationService.createReservation({
                terrainId,
                reservedBy,
                reservationDate,
                phoneNumber,
            });
            setSuccess("Reservation created successfully!");
            setTerrainId("");
            setReservedBy("");
            setReservationDate("");
            setPhoneNumber("");
        } catch (err) {
            console.error("API Error:", err);
            setError(
                err.response?.data?.message || "An error occurred. Please try again."
            );
        }


    };

    return (
        <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w="100%"
            mx="auto"
            h="100%"
            alignItems="start"
            justifyContent="center"
            mt={{ base: "40px", md: "14vh" }}
            flexDirection="column"
        >
            <Box>
                <Heading color={textColor} fontSize="36px" mb="10px">
                    Create Reservation
                </Heading>
                <Text
                    mb="36px"
                    color={textColorSecondary}
                    fontWeight="400"
                    fontSize="md"
                >
                    Fill in the details to reserve a terrain.
                </Text>
            </Box>
            <Flex
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx="auto"
            >
                <FormControl as="form" onSubmit={handleReservationSubmit}>
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                        Terrain ID<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        isRequired
                        type="number"
                        placeholder="Enter Terrain ID"
                        mb="24px"
                        size="lg"
                        value={terrainId}
                        onChange={(e) => setTerrainId(e.target.value)}
                    />
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                        Reserved By<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        isRequired
                        type="text"
                        placeholder="Enter Your Name"
                        mb="24px"
                        size="lg"
                        value={reservedBy}
                        onChange={(e) => setReservedBy(e.target.value)}
                    />
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                        Reservation Date<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        isRequired
                        type="datetime-local"
                        placeholder="Select Date and Time"
                        mb="24px"
                        size="lg"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                    />
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                        Phone Number<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        isRequired
                        type="tel"
                        placeholder="Enter Your Phone Number"
                        mb="24px"
                        size="lg"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <Button
                        fontSize="sm"
                        variant="brand"
                        fontWeight="500"
                        w="100%"
                        h="50"
                        mb="24px"
                        type="submit"
                    >
                        Create Reservation
                    </Button>
                </FormControl>
                {error && <Text color="red.500" mt="2">{error}</Text>}
                {success && <Text color="green.500" mt="2">{success}</Text>}
            </Flex>
        </Flex>
    );
}

export default Reservation;


// export default function Reservation() {
//     return (
//         <div>
//             <h1>im Reservation</h1>
//
//         </div>
//     );
// }
