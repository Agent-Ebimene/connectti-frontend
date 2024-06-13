import { menuItems } from '@/lib/constants'
import { Button } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'


const Menu = () => {
    const [activeTab, setActiveTab] = useState('Home')
    const navigate = useNavigate()

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab)
    }

    return (

        <div className="bg-white  shadow-sm ring-gray-900/5">
            <div className="mx-auto flex  justify-center max-w-4xl grid-cols-1 gap-2 px-6  sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8">
                {menuItems.map((item) => (
                    <Button
                        key={item.name}
                        className={`group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm leading-6  sm:flex-col sm:p-6 items-center ${item.name === activeTab ? "bg-gray-50" : ""}`}
                        onClick={() => {
                            handleChangeTab(item.name)
                            navigate(`${item.href}`)

                        }}

                    >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div>
                            <a href={item.href} className="font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                            </a>

                        </div>
                    </Button>
                ))}
            </div>

        </div>
    )
}



export default Menu