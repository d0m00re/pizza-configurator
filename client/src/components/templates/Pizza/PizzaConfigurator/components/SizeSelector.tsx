import React from 'react'
import useStorePizza from "./../../Store/pizza.zustand";
import { Button } from '@/components/ui/button';

function SizeSelector() {
    const storePizza = useStorePizza();

    return (
        <section className='flex flex-col gap-2'>
            <h3 className=' text-xl'>size </h3>

            <div className=' flex flex-row gap-2 justify-center'>
                <Button onClick={() => storePizza.setSize("small")}>small</Button>
                <Button onClick={() => storePizza.setSize("medium")}>medium</Button>
                <Button onClick={() => storePizza.setSize("xl")}>xl</Button>
            </div>
        </section>)
}

export default SizeSelector