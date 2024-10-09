"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "../_lib/validators.js";
import { useFetch } from "@/hooks/useFetch.js";
import { updateUsername } from "@/actions/users.js";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
    const { isLoaded, user } = useUser();

    useEffect(() => {
        setValue("username", user?.username);
    }, [isLoaded]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(usernameSchema),
    });
    const { isLoading, error, fn: fnUpdateUsername } = useFetch(updateUsername);
    const onSubmit = async (data) => {
        fnUpdateUsername(data.username);
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user?.firstName}</CardTitle>
                </CardHeader>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Your Unique Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span>{window.location.origin}/</span>
                                <Input {...register("username")} placeholder="username" />
                            </div>
                            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
                            {error && <p className="text-sm text-red-500 mt-1">{error?.message}</p>}
                        </div>
                        <Button type="submit">Update Username</Button>
                        {isLoading && <BarLoader width={"100%"} color="#0000" />}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
