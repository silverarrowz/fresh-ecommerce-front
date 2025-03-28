import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, register } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Неверный адрес электронной почты"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Имя обязательно"),
    email: z.string().email("Неверный адрес электронной почты"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
    path: ["password_confirmation"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface ApiError {
  message: string;
}

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(data);
      localStorage.setItem("token", response.access_token);
      setUser(response.user);
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      setError(axiosError.response?.data?.message || "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await register(data);
      localStorage.setItem("token", response.access_token);
      setUser(response.user);
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      setError(axiosError.response?.data?.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Добро пожаловать
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger className="cursor-pointer" value="login">
                Вход
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="register">
                Регистрация
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="test@example.com"
                            {...field}
                            className="py-6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Введите пароль"
                            className="py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-6 h-12 cursor-pointer hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    disabled={isLoading}
                  >
                    {isLoading ? "Вход..." : "Вход"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="register">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите имя"
                            {...field}
                            className="py-6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="test@example.com"
                            {...field}
                            className="py-6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Введите пароль"
                            className="py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Подтвердите пароль"
                            className="py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-6 h-12 cursor-pointer hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_34px_2px_rgba(0,211,243,0.63)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    disabled={isLoading}
                  >
                    {isLoading ? "Подождите..." : "Создать аккаунт"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          <Link to="/">
            <p className="text-sm text-center mt-6 text-gray-500">На главную</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
