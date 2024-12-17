
import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
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
    Select,
    Alert,
    Spinner
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import ReservationService from "../../../services/ReservationService";
import CentreService from "../../../services/CentreService";
import TerrainService from "../../../services/TerrainService";

function Reservation() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    // Form state
    const [centres, setCentres] = useState([]);
    const [terrains, setTerrains] = useState([]);
    const [selectedCentre, setSelectedCentre] = useState("");
    const [selectedTerrain, setSelectedTerrain] = useState("");
    const [loadingCentres, setLoadingCentres] = useState(true);
    const [loadingTerrains, setLoadingTerrains] = useState(false);

    const [terrainId, setTerrainId] = useState("");
    const [reservedBy, setReservedBy] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [reservationDate, setReservationDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [reservedTimeSlots, setReservedTimeSlots] = useState([]);

    // Fetch centers on component mount
    useEffect(() => {
        const fetchCentres = async () => {
            setLoadingCentres(true);
            try {
                const response = await CentreService.getCentres();
                setCentres(response.data);
            } catch (error) {
                console.error("Failed to fetch centers:", error);
                setError("Error loading centers. Please try again.");
            } finally {
                setLoadingCentres(false);
            }
        };

        fetchCentres();
    }, []);

    // Fetch terrains whenever a center is selected
    useEffect(() => {
        const fetchTerrains = async () => {
            if (selectedCentre) {
                setLoadingTerrains(true);
                try {
                    const response = await TerrainService.getTerrainsByCentre(selectedCentre);
                    console.log("Terrains response:", response); // Debug
                    setTerrains(response.data); // Ensure response is an array
                } catch (error) {
                    console.error("Failed to fetch terrains:", error);
                    setError("Error loading terrains. Please try again.");
                } finally {
                    setLoadingTerrains(false);
                }
            } else {
                setTerrains([]);
            }
        };


        fetchTerrains();
    }, [selectedCentre]);

    // Fetch reservations
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await ReservationService.getReservations();
                const reservations = response.data;
                const reservedSlots = reservations.map(reservation => {
                    const [date, time] = reservation.reservationDate.split('T');
                    return { date, time: time.substring(0, 5) }; // Extract date and HH:mm format
                });
                setReservedTimeSlots(reservedSlots);
            } catch (err) {
                console.error("Failed to fetch reservations:", err);
            }
        };


        fetchReservations();
    }, []);
        
    const generateTimeSlots = (start, end) => {
        const slots = [];
        let current = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');

        while (current <= endTime) {
            slots.push(current.format('HH:mm'));
            current.add(1, 'hour');
        }

        return slots;
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setReservationDate(date);

        if (selectedCentre && centres[selectedCentre]?.horaires) {
            const [startTime, endTime] = centres[selectedCentre].horaires.split(','); // Extract start and end times
            setTimeSlots(generateTimeSlots(startTime, endTime));
        } else {
            console.error("Horaires not available for the selected centre.");
            setTimeSlots([]); // Clear time slots if no valid horaires
        }
    };

    const isTimeSlotReserved = (time) => {
        return reservedTimeSlots.some(slot => slot.date === reservationDate && slot.time === time);
    };

    const handleTimeSlotClick = (time) => {
        setSelectedTimeSlot(time);
        if (reservationDate && time) {
            const combinedDateTime = `${reservationDate}T${time}:00`;
            setReservationDate(combinedDateTime);
        }
    };


    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Debugging: Log form data
        console.log("Form Data Submitted:", {
            terrainId: selectedTerrain,
            reservedBy,
            reservationDate,
            phoneNumber,
        });

        try {
            await ReservationService.createReservation({
                terrainId: selectedTerrain,
                reservedBy,
                reservationDate,
                phoneNumber,
            });
            setSuccess("Reservation created successfully!");
            setSelectedCentre("");
            setSelectedTerrain("");
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
                    {/* Center Dropdown */}
                    <FormLabel>Center</FormLabel>
                    {loadingCentres ? (
                        <Spinner mb="24px" />
                    ) : (
                        <Select
                            placeholder="Select a Center"
                            value={selectedCentre}
                            onChange={(e) => setSelectedCentre(e.target.value)}
                            mb="24px"
                            isRequired
                        >
                            {centres.map((centre) => (
                                <option key={centre.id} value={centre.id}>
                                    {centre.nom}
                                </option>
                            ))}
                        </Select>
                    )}

                    {/* Terrain Dropdown */}
                    <FormLabel>Terrain</FormLabel>
                    {loadingTerrains ? (
                        <Spinner mb="24px" />
                    ) : (
                        <Select
                            placeholder="Select a Terrain"
                            value={selectedTerrain}
                            onChange={(e) => setSelectedTerrain(e.target.value)}
                            mb="24px"
                            isRequired
                            isDisabled={!selectedCentre || loadingTerrains} // Disable if no center or terrains are loading
                        >
                            {terrains.map((terrain) => (
                                <option key={terrain.id} value={terrain.id}>
                                    {terrain.nom}
                                </option>
                            ))}
                        </Select>
                    )}


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
                    <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                        Reservation Date
                    </FormLabel>
                    <Input
                        type="date"
                        placeholder="Select Date"
                        mb="24px"
                        size="lg"
                        value={reservationDate.split('T')[0]} // Show only the date part
                        onChange={handleDateChange}
                    />

                    {timeSlots.length > 0 && (
                        <>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                Reservation Time Slot
                            </FormLabel>
                            <Flex wrap="wrap" gap="10px" mb="24px">
                                {timeSlots.map((slot, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleTimeSlotClick(slot)}
                                        variant={selectedTimeSlot === slot ? "solid" : "outline"}
                                        colorScheme="blue"
                                        borderRadius="full"
                                        isDisabled={isTimeSlotReserved(slot)}
                                    >
                                        {slot}
                                    </Button>
                                ))}
                            </Flex>
                        </>
                    )}

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
