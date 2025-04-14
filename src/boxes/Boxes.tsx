import { useEffect, useState } from "react"

import Box from "./Box";

import "./Boxes.css";

const AMOUNT_OF_BOXES = 7;
export default function Boxes() {
    const [onOrder, setOnOrder] = useState<string[]>([]);

    // Will check to see if the boxes need to be toggled
    useEffect(() => {
        if (onOrder.length === AMOUNT_OF_BOXES) {
            const removeNext = () => {
                setOnOrder(prevOrder => {
                    if (prevOrder.length === 0) return prevOrder; // Stop when empty
                    const newOrder = prevOrder.slice(1);

                    if (newOrder.length > 0) {
                        setTimeout(removeNext, 1000); // Recursively remove next after delay
                    }

                    return newOrder;
                });
            };

            setTimeout(removeNext, 1000);
        }
    }, [onOrder]);


    function updateState(id: string) {
        setOnOrder(prevOnOrder => 
            prevOnOrder.includes(id) 
                ? prevOnOrder.filter(item => item !== id) 
                : [...prevOnOrder, id]
        );
    }


    return (
        <div className="box-container">
            <span>
                <Box id={"0"} onState={onOrder} updateStateFunc={updateState}/>
                <Box id={"1"} onState={onOrder} updateStateFunc={updateState}/>
                <Box id={"2"} onState={onOrder} updateStateFunc={updateState}/>  
            </span>

            <span>
                <Box id={"3"} onState={onOrder} updateStateFunc={updateState}/>
            </span>
            
            <span>
                <Box id={"4"} onState={onOrder} updateStateFunc={updateState}/>  
                <Box id={"5"} onState={onOrder} updateStateFunc={updateState}/>  
                <Box id={"6"} onState={onOrder} updateStateFunc={updateState}/>
            </span>
        </div>
    )
}