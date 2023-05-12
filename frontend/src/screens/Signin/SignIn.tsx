import { useState } from "react";

import { VStack, Heading, Icon, useTheme, Image } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { InputCamp } from "../../components/Inputs/InputCamp";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
export function SignIn() {
	const { colors } = useTheme();

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSignIn() {
		console.log("Oi");
	}

	return (
		<VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
			<Image
				size={150}
				borderRadius={100}
				source={require("../../../assets/logo.png")}
			/>
			<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
				Login
			</Heading>
			<InputCamp
				mb={4}
				placeholder="E-mail"
				InputLeftElement={
					<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
				}
				onChangeText={setEmail}
			/>
			<InputCamp
				mb={8}
				placeholder="Senha"
				InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
				secureTextEntry
				onChangeText={setPassword}
			/>

			<ButtonForm
				title="Entrar"
				w="full"
				onPress={handleSignIn}
				isLoading={isLoading}
			/>
		</VStack>
	);
}
