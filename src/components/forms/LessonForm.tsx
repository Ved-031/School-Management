"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/forms/InputField";


interface LessonFormProps {
    type: "create" | "update",
    data?: any,
}

const formSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" })
        .max(20, { message: "Username must be at most 20 characters long!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long!" }),
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
    phone: z.string().min(1, { message: "Phone number is required!" }),
    address: z.string().min(1, { message: "Address is required!" }),
})

type Inputs = z.infer<typeof formSchema>;

const LessonForm = ({ type, data }: LessonFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: any) => {
        console.log(values);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-3 gap-5'>
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new lesson" : "Update lesson"}</h1>
            {/* AUTH INFO */}
            <div className="flex flex-col gap-3 md:mt-3">
                <span className="text-sm font-medium text-black">Authentication Information</span>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <InputField
                        name="username"
                        label="Username"
                        placeholder="Enter username"
                        error={errors?.username}
                        register={register}
                        defaultValue={data?.username}
                    />
                    <InputField
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Enter email"
                        error={errors?.email}
                        register={register}
                        defaultValue={data?.email}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter password"
                        error={errors?.password}
                        register={register}
                        defaultValue={data?.password}
                    />
                </div>
            </div>
            {/* PERSONAL INFO */}
            <div className="flex flex-col gap-3 md:mt-3">
                <span className="text-sm font-medium text-black">Personal Information</span>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <InputField
                        name="firstName"
                        label="First Name"
                        placeholder="Enter first name"
                        error={errors?.firstName}
                        register={register}
                        defaultValue={data?.firstName}
                    />
                    <InputField
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter last name"
                        error={errors?.lastName}
                        register={register}
                        defaultValue={data?.lastName}
                    />
                    <InputField
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter phone number"
                        error={errors?.phone}
                        register={register}
                        defaultValue={data?.phone}
                    />
                    <InputField
                        name="address"
                        label="Address"
                        placeholder="Enter address"
                        error={errors?.address}
                        register={register}
                        defaultValue={data?.address}
                    />
                </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button type="submit" className="mt-5 bg-blue-500 text-white rounded-md p-2 text-sm hover:bg-blue-600 transition-all duration-300">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
  )
}

export default LessonForm;