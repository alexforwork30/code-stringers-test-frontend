import { useState } from "react";
import {
  Input,
  Button,
  InputGroup,
  Flex,
  VStack,
  InputLeftElement,
  chakra,
  Link,
  FormControl,
  Checkbox,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ILoginForm } from "./interfaces";
import { login } from "../../API/auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { getAxiosErrorMessage, handleError } from "../../API/error";
import { get } from "lodash";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  async function onSubmit(data: ILoginForm) {
    try {
      console.log(errors);
      const token: string = await login({
        email: data.email,
        password: data.password,
      });
      if (data.isRememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      toast.success("Login successfully!");
    } catch (error) {
      const errorMessage: string = getAxiosErrorMessage(error as AxiosError);
      toast.error(errorMessage);
      handleError(error as AxiosError, "components/LoginForm", "onSubmit");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack
        spacing={4}
        padding={4}
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
      >
        <FormControl isInvalid={!!get(errors, "email", false)}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt color="gray.300" />}
            />
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {get(errors, "email.message", "")}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!get(errors, "password", false)}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<CFaLock color="gray.300" />}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <InputRightElement width={20}>
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {get(errors, "password.message", "")}
          </FormErrorMessage>
        </FormControl>
        <Flex justify="space-between" width="full">
          <Checkbox defaultChecked {...register("isRememberMe")}>
            Remember me
          </Checkbox>
          <Link>Forgot password?</Link>
        </Flex>

        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
