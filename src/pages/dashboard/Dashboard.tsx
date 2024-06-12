import { menuItems } from '@/lib/constants'
// import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'


const Dashboard = () => {

    return (

        <div className="bg-white  shadow-sm ring-gray-900/5">
            <div className="mx-auto flex  justify-center max-w-4xl grid-cols-1 gap-2 px-6  sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 sm:flex-col sm:p-6 items-center"
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
                    </div>
                ))}
            </div>



        </div>
    )
}



export default Dashboard