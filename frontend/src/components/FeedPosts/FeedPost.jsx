import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { motion ,useMotionValue, useSpring, useTransform } from "framer-motion";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);
	const x=useMotionValue(0)
	const y=useMotionValue(0)

	const mousexSpring=useSpring(x)
	const mouseySpring=useSpring(y) 

	const rotateX=useTransform(mouseySpring,
		[-0.5,0.5],
		["17.5deg","-17.5deg"]
		)
	const rotateY=useTransform(mousexSpring,
		[-0.5,0.5],
		["25.5deg","-25.5deg"]
		)

	const handleMouseMove=(e)=>{
		const rect=e.target.getBoundingClientRect();

		const width=rect.width;
		const height=rect.height;

		const mouseX=e.clientX-rect.left;
		const mouseY=e.clientX-rect.top;

		const xpct=mouseX / width - 0.5;
		const ypct=mouseY / width - 0.5;

		x.set(xpct)
		y.set(ypct)
	}
	const handleMouseLeave=()=>{
		x.set(0)
		y.set(0)
	}
	return (
		<>
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={"hidden"} >
				<motion.div style={{rotateX,rotateY}} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
				<Image  src={post.imageURL} alt={"FEED POST IMG"} />
				</motion.div>
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</>
	);
};

export default FeedPost;
