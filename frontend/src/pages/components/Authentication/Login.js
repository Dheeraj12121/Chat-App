import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
const Login = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const handleClick = () => {
      setShow(!show);
    };
  
    const postDetails = (pics) => {};
  
    const submitHandler = () => {
      
    }
    return (
      <VStack spacing={"5px"} color={"black"}>
       
        <FormControl id="email" isRequired>
          <FormLabel> Email </FormLabel>
          <Input
            placeholder="Enter Your E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel> Password </FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
       
      </VStack>
    );
  };
  
  export default Login;
  