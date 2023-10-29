import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvator/UserBadgeItem";
import axios from "axios";
import { query } from "express";
import UserListItem from "../UserAvator/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, serFetchAgain }) => {
  const { isOpen, Open, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [setsearch, setSetsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [ChatLoading, setChatloading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const tost = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleAddUser = async (user1) => {
    if (selectedChat.user.find((u) => u.id === user1._id)) {
      tost({
        title: "User Already in group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user.id) {
      tost({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(`/api/chat/groupadd`, {
          chatId: selectedChat._id,
          userId: user1._id,
        },config);

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false)
      } catch (error) {
        tost({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false)
      }
    }
  };
  const handleRemove = async (user1) => {
    if(selectedChat.groupAdmin._id !== user._id && user1._id !== user.id){
        tost({
            title: "Only admins can remove someone!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      tost({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = () => {
    setsearch(query);
    if (!query) {
      return;
    }
  };

  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} d="flex" flexWrap={"wrap"} pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size={"lg"} />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user1)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
