import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SiderDrawer from "./components/miscellaneous/SiderDrawer";
import ChatBox from "./components/ChatBox";
import MyChats from "./components/MyChats";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100" }}>
      {user && <SiderDrawer />}

      <Box
      d='flex'
      justifyContent={"space-between"}
      w='100%'
      h='91.5vh'
      p='10px'>
        {user && <MyChats/> }
        {user && <ChatBox/> }
      </Box>
    </div>
  );
};

export default Chatpage;
