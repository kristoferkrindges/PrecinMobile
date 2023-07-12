import { useState, useEffect } from "react";
import {
	VStack,
	useTheme,
	Image,
	Box,
	ScrollView,
	Icon,
	Button,
} from "native-base";
import { MenuTop } from "../../../components/Menus/MenuTop";
import {
	Camera,
	Image as Img,
	Tag,
	CurrencyDollarSimple,
	Storefront,
	MapPin,
} from "phosphor-react-native";
import { InputCamp } from "../../../components/Inputs/InputCamp";
import { ButtonForm } from "../../../components/Buttons/ButtonForm";
import PostService from "../../../services/post";
import { getPostById, editPost } from "../../../services/usePost";
import { Loading } from "../../../components/Loadings/Loading";
export function EditPost({ id = "64acc1c7ddd0bae9474d0aad" }) {
	const [controllerImage, setControllerImage] = useState(false);

	const [imgFormat, setImgFormat] = useState();
	useEffect(() => {
		fetchPosts();
	}, []);
	const fetchPosts = async () => {
		try {
			const result = await getPostById(id);
			setPost(result);
			setName(result.product);
			setPrice(result.price.toString());
			setMarket(result.market);
			setAddress(result.address);
			setImage(result.productImage);
		} catch (error) {
			console.error("Falha ao buscar as postagens:", error);
		}
	};
	const [post, setPost] = useState();
	const [name, setName] = useState();
	const [price, setPrice] = useState();
	const [market, setMarket] = useState();
	const [address, setAddress] = useState();
	const [imagep, setImage] = useState();

	const formData = new FormData();
	async function handlePost() {
		let post;
		if (controllerImage) {
			post = {
				product: name,
				price: price,
				market: market,
				address: address,
				productImage: imgFormat,
			};
		} else {
			post = {
				product: name,
				price: price,
				market: market,
				address: address,
				productImage: imagep,
			};
		}
		await Object.keys(post).forEach((key) => formData.append(key, post[key]));
		try {
			// await editPost(id, formData);
			await PostService.edit(id, formData);
			console.log("foi");
		} catch (error) {
			console.log(error.response.data);
		}
	}

	const { colors } = useTheme();
	return (
		<>
			{post ? (
				<VStack
					flex="1"
					alignItems="center"
					bg="gray.700"
					w="100%"
					px={8}
					pt={14}
				>
					{/* {imagep ? (
				<Image
					size={150}
					borderRadius={"md"}
					alt="postImage"
					source={require("../../../../assets/avatar.png")}
				/>
			) : (
				<Image
					size={150}
					borderRadius={"md"}
					source={{
						uri: `http://10.0.2.2:3000/files/posts/${imagep}`,
					}}
					alt="postImage"
				/>
			)} */}
					<Image
						size={150}
						borderRadius={"md"}
						source={{
							uri: `http://10.0.2.2:3000/files/posts/${imagep}`,
						}}
						alt="postImage"
					/>
					<Button variant="unstyled" width={75} height={30}>
						<Camera color="white" size={28} />
					</Button>
					<InputCamp
						mb={4}
						placeholder="Nome"
						InputLeftElement={
							<Icon as={<Tag color={colors.gray[300]} />} ml={4} />
						}
						value={name}
						onChangeText={setName}
					/>
					<InputCamp
						mb={4}
						placeholder="Preço"
						InputLeftElement={
							<Icon
								as={<CurrencyDollarSimple color={colors.gray[300]} />}
								ml={4}
							/>
						}
						value={price}
						onChangeText={setPrice}
					/>
					<InputCamp
						mb={4}
						placeholder="Mercado"
						InputLeftElement={
							<Icon as={<Storefront color={colors.gray[300]} />} ml={4} />
						}
						value={market}
						onChangeText={setMarket}
					/>
					<InputCamp
						mb={4}
						placeholder="Rua X, 1500"
						InputLeftElement={
							<Icon as={<MapPin color={colors.gray[300]} />} ml={4} />
						}
						value={address}
						onChangeText={setAddress}
					/>
					<ButtonForm
						onPress={handlePost}
						mb={4}
						title="Editar postagem"
						w="full"
					/>
				</VStack>
			) : (
				<Loading />
			)}
		</>
	);
}
