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
import dayjs from 'dayjs';


function SignUp() {
    const dispatch = useDispatch<AppDispatch>();
    let userSchema = object({
        firstName: string().required('Name Cannot must be have atleast 3 letters').min(3),
        password: string().required('Password is required').min(6, 'Password should be 6 characters and above'),
        email: string().email().required('Email is required'),
        lastName: string().required().min(3),
        dateOfBirth: date().required('Date of birth is required'),
        description: string().required(''),
    });


    const [user, setUser] = useState<CreateUserData>({
        firstName: '',
        email: '',
        lastName: '',
        password: '',
        dateOfBirth: new Date(),
        description: '',

    })
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            await userSchema.validate(user, { abortEarly: false })
            dispatch(createUser(user))

            console.log('Form Submitted', user)
        } catch (err) {
            if (err instanceof ValidationError) {
                err.inner.forEach((error) => {
                    console.log(error.message); // Log each error message
                });
            } else {
                console.error('An unexpected error occurred', err);
            }
        }

        // try {


        //     const formattedDateOfBirth = dayjs(user.dateOfBirth).format('YYYY-MM-DD 00:00:00');

        //     console.log(formattedDateOfBirth)
        //     dispatch(createUser(user))
        // } catch (err) {
        //     console.error(err)
        // }


    }

    const handleDateChange = (date: Date) => {

        setUser((user) => ({ ...user, dateOfBirth: date }))
    }
    return (
        <form className='flex min-h-full  flex-1 flex-col  items-center px-6 py-12 lg:px-8' onSubmit={handleSubmit}>
            <div className="space-y-12 ">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Create Your account</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    onChange={(e) => setUser((user) => ({ ...user, firstName: e.target.value }))}
                                    autoComplete="first-name"

                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    onChange={(e) => setUser((user) => ({ ...user, lastName: e.target.value }))}

                                />
                            </div>
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
                                onChange={(e) => setUser((user) => ({ ...user, email: e.target.value }))}

                            />
                        </div>
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
                    </div>

                    <div className="sm:col-span-4 w-full mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <Input
                                id="password"
                                name="password"
                                type="text"
                                autoComplete="password"
                                className='w-full'
                                onChange={(e) => setUser((user) => ({ ...user, password: e.target.value }))}

                            />
                        </div>
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

                                />
                            </div>
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