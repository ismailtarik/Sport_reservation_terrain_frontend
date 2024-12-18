import React from "react";
import { Box, Button, Flex, Link, Text, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const cardBg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} bg={boxBg} minH="100vh">
            <Flex direction="column" alignItems="center">
                <Heading mb={8} color={textColor}>
                    Welcome to Our Reservation System
                </Heading>
                <Flex
                    justifyContent="center"
                    direction={{ base: "column", md: "row" }}
                    gap={6}
                    px={4}
                >
                    {/* Card 1 */}
                    <Box
                        bg={cardBg}
                        boxShadow="md"
                        borderRadius="md"
                        p={6}
                        w={{ base: "full", md: "300px" }}
                        textAlign="center"
                    >
                        <Heading size="md" mb={4} color={textColor}>
                            Make a Reservation
                        </Heading>
                        <Text mb={6} color={textColor}>
                            Book your spot easily and securely for your preferred date and time.
                        </Text>
                        <Button
                            colorScheme="teal"
                            variant="solid"
                            size="md"
                            as={RouterLink}
                            to="/reservation"
                        >
                            Get Started
                        </Button>
                    </Box>

                    {/* Card 2 */}
                    <Box
                        bg={cardBg}
                        boxShadow="md"
                        borderRadius="md"
                        p={6}
                        w={{ base: "full", md: "300px" }}
                        textAlign="center"
                    >
                        <Heading size="md" mb={4} color={textColor}>
                            Sign in
                        </Heading>
                        <Text mb={6} color={textColor}>
                            You are an admin ?
                            Access your account to manage everything.
                        </Text>
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            size="md"
                            as={RouterLink}
                            to="/auth/sign-in"
                        >
                            Sign in
                        </Button>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}
