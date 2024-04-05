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
import { useLoginMutation } from "@/redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";

interface ILoginProps {}

const formSchema = z.object({
  userId: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
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
          <h1 className="font-mono text-4xl font-bold mb-2 ">Login</h1>
          <p className="font-mono text-xs">
            Enter your credentials to access your account👍
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username or Email"
                      {...field}
                      required
                      disabled={isLoading}
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
                      type="password"
                      disabled={isLoading}
                      placeholder="Password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono ">
          Don't have an account ?&nbsp;
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
