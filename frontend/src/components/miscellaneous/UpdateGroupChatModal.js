import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const UpdateGroupChatModal = ({ fetchAgain, serFetchAgain }) => {
  const { isOpen, Open, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState()
  const [setsearch, setSetsearch] = useState("")
  const [searchResult, setsearchResult] = useState([])
  const [ChatLoading, setChatLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const tost = useToast()

  const {selectedChat,setSelectedChat,user} = ChatState()
  return (
    <>
      <IconButton d={{base:'flex'}} icon={<ViewIcon/>} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
                
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
