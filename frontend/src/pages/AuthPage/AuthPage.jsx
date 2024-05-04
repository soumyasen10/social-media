import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
import ScreenBg from '../../assets/screenbg.png'

const AuthPage = () => {
	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					<Box display={{ base: "none", md: "block" }}>
						<Image src={ScreenBg} h={'450px'} alt='Phone img' />
					</Box>
					<VStack spacing={4} align={"stretch"}>
						<AuthForm />
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
