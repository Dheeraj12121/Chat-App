import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Children } from "react";
import UserListItem from "../UserAvator/UserListItem";

const GroupChatModal = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [setselectedUsers, setSetselectedUsers] = useState([]);
  const [setsearch, setSetsearch] = useState("");
  const [setsearchResult, setSetsearchResult] = useState([]);
  const [ChatLoading, setChatLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setsearch(query);
    if (!query) {
      return;
    }

    try {
      setChatLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if(!groupChatName || !selectedUsers){
      toast({
        title:"Please fill all the feilds",
        status:"warning",
        duration: 5000,
        isClosable: true,
        position:"top"
      })
      return;
    }
    try {
      const config ={
        headers:{
          Authorization: `Bearer ${user.token}`
        },
      }

      const {data} = await axios.post('/api/chat/group',{
        name:groupChatName,
        users: JSON.stringify(selectedUsers.map((u)=> u._id))
      },
      config
      )

      setChats([data,...chats])
      onClose();
      toast({
        title:"New Group Chat Created",
        status:"Success",
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      

    } catch (error) {
      toast({
        title:"Failed to Create the Chat!",
        description: error.response.data,
        status:"warning",
        duration: 5000,
        isClosable: true,
        position:"top"
      })
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }
    setselectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    selectedUsers(selectedUser.filter((sel)=>selectedUser._id !== delUser._id))
  };

  return (
    <>
      <span onClick={onOpen}>{Children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            d="flex"
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalBody d="flex" flexDir={"column"} alignItems={"center"}>
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add Users eg: John, Piyush, Jane"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>

              <Box>
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={user._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>

              {loading ? (
                <div>Loading</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
