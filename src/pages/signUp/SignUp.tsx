import { Link } from 'react-router-dom'
import { object, string, number, date, InferType, ValidationError } from 'yup';

import CustomDatePicker from '@/components/CustomDatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CreateUserData } from '@/types/user/user'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/service/redux/store'
import { createUser } from '@/features/user/userApi'
import { toast } from '@/hooks/use-toast';

import { cn } from '@/lib/utils';


function SignUp() {
    const dispatch = useDispatch<AppDispatch>();
    let userSchema = object({
        firstName: string().required('Name Cannot must be have atleast 3 letters').min(3, 'First name must be at least 3 characters'),
        password: string().required('Password is required').min(6, 'Password should be 6 characters and above'),
        email: string().required('Email is required').email('This is not a valid email'),
        lastName: string().required().min(3, "Last name must be at least 3 characters"),
        dateOfBirth: date().required('Date of birth is required'),
        description: string().required('Add a description about yourself'),
    });


    const [user, setUser] = useState<CreateUserData>({
        firstName: '',
        email: '',
        lastName: '',
        password: '',
        dateOfBirth: new Date(),
        description: '',

    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            await userSchema.validate(user, { abortEarly: false })
            dispatch(createUser(user))



        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Record<string, string> = {}
                err.inner.forEach((error) => {
                    if (error.path) {
                        console.log(error.path)
                        newErrors[error.path] = error.message;
                        setErrors(newErrors)
                    }
                });
            }


            else {
                // console.error('An unexpected error occurred', err);
                console.log('*******************', err)
                toast({
                    title: "Oh,something went wrong",
                    "description": "There was a problem with your resquest"
                })
            }
        } finally {
            toast({
                title: "Registration",
                description: "Account Successfully Created!",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            })
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUser((user) => ({
            ...user,
            [name]: value
        }))

    }

    const handleDateChange = (date: Date) => {

        setUser((user) => ({ ...user, dateOfBirth: date }))
    }
    return (
        <form className='flex min-h-full  flex-1 flex-col  items-center px-6 py-12 lg:px-8' onSubmit={handleSubmit}>
            <div className="space-y-12 ">
                <div className="border-b border-gray-900/10 pb-12">
                    <h1>Testing github actions</h1>     {/* To be removed */}
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Create Your account</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="first-name"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    autoComplete="first-name"

                                />
                            </div>
                            {errors.firstName && <p className='text-red-500'>{errors.firstName}</p>}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <Input
                                    value={user.lastName}
                                    type="text"
                                    name="lastName"
                                    id="last-name"
                                    autoComplete="family-name"
                                    onChange={handleChange}


                                />
                            </div>
                            {errors.lastName && <p className='text-red-500'>{errors.firstName}</p>}

                        </div>
                    </div>
                    <div className="sm:col-span-4 w-full mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className='w-full'
                                value={user.email}
                                onChange={handleChange}


                            />
                        </div>
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}

                    </div>

                    <div className="sm:col-span-4 mt-4 ">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Date of Birth
                        </label>
                        <div className='mt-3 '>
                            <CustomDatePicker
                                onChange={handleDateChange}



                            />
                        </div>
                        {errors.dateOfBirth && <p className='text-red-500'>{errors.dateOfBirth}</p>}

                    </div>

                    <div className="sm:col-span-4 w-full mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                className='w-full'
                                value={user.password}
                                onChange={handleChange}


                            />
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}

                    </div>

                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                                <Textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    defaultValue={''}
                                    onChange={(e) => setUser((user) => ({ ...user, description: e.target.value }))}
                                    value={user.description}

                                />
                            </div>
                            {errors.description && <p className='text-red-500'>{errors.description}</p>}
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>


                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-center gap-x-6">
                {/*  <Button type="button" className="text-sm font-semibold leading-6 text-gray-900 w-24"
                    variant='secondary'>
                    Cancel
                </Button>
                */}
                <Button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-24"
                >
                    Save
                </Button>

            </div>
            <div className="text-sm mt-4">
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Already have an account?
                </Link>
            </div>
        </form >
    )
}

export default SignUp