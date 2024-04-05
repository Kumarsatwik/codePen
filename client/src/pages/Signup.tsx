import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "./styles/grid.css";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "@/components/utils/handleError";
import { useSignupMutation } from "@/redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";

interface ISignupProps {}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(2).max(50),
});

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values).unwrap();
      // console.log(response);
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex flex-col justify-center items-center gap-3">
      <div className="__form_container w-2/5 backdrop-blur-[10px] border py-8 px-4 flex flex-col gap-5">
        <div>
          <h1 className="font-mono text-4xl font-bold mb-2 ">Signup</h1>
          <p className="font-mono text-xs">
            Enter your details to create your account👍
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full" type="submit">
              Signup
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono ">
          Already have an account ?&nbsp;
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Signup;
