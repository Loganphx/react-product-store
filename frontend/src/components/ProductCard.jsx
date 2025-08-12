import {
    Box, Button,
    Heading,
    HStack,
    IconButton,
    Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useToast, VStack
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, useDisclosure} from "@chakra-ui/icons";
import {useProductStore} from "../store/product.js";
import {useState} from "react";

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('gray.100', 'gray.800')
    const fallbackUrl = 'https://static1.squarespace.com/static/530cd931e4b0e49b19b254ec/t/63c6068bcdde5a79958619df/1673922187854/final+logo++copy-1+%281%29.png?format=1500w';


    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    };
    const handleUpdateProduct = async (pid) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        if(!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        onClose();
    }

    return (
        <Box
            id="productCard"
            className="product-card"
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            bg={bg}
            _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        >
            <Image src={product.image} alt={product.name} h={80} w='full' objectFit='cover'
                   fallbackSrc={fallbackUrl} // Chakra UI built-in fallback image prop (optional)
            />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price.toFixed(2)}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'/>
                    <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>

                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Update Product</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <VStack spacing={4}>
                                <Input
                                    placeholder='Product Name'
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                                />
                                <Input
                                    placeholder='Price'
                                    name='price'
                                    type='number'
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                                />
                                <Input
                                    placeholder='Image URL'
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                                />
                            </VStack>
                        </ModalBody>
                        <ModalFooter spacing={2}>
                            <Button colorScheme='blue' onClick={() => handleUpdateProduct(product._id, updatedProduct)} mr={3}>Update</Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

        </Box>
    )
}

export default ProductCard