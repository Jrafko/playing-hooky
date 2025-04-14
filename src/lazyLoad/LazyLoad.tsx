import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";
import LazyList from "./components/LazyList";

const ITEMS_AT_A_TIME = 50;
const ITEM_LIMIT = 300;
/**
 * @function LazyLoad will contain a LazyList that updates the list inside of it.
 * @returns LazyLoad Component
 */
export default function LazyLoad() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasHitLimit, setHasHitLimit] = useState(false);
    const [itemList, setItemList] = useState<string[]>(() => {
        const initialItems: string[] = [];
        for (let i = 0; i < ITEMS_AT_A_TIME; i++) {
            initialItems.push("item: " + i.toString());
        }
        return initialItems;
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (hasHitLimit || itemList.length >= ITEM_LIMIT) {
            setHasHitLimit(true);
            return;
        }
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            window.removeEventListener("scroll", handleScroll);
        }
    }, [itemList]);

    const handleScroll = useCallback(
        throttle(() => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                if (!isLoading) {
                    setIsLoading(true);
                    timeoutRef.current = setTimeout(() => {
                        addToExistingList();
                        setIsLoading(false);
                    }, 1000);
                }
            }
        }, 200), // ✅ Run at most once every 200ms
        [isLoading]
    );

    /**
     * @function addToExistingList will add 20 elements to the existing list
     */
    function addToExistingList() {
        setItemList(prevItems => {
            const newStuff: string[] = [];
            for (let i = 0; i < ITEMS_AT_A_TIME; i++) {
                newStuff.push("item: " + (i + prevItems.length).toString());
            }
            return [...prevItems, ...newStuff];
        })
    }

    return (
        <div>
            <LazyList items={itemList} isLoading={isLoading} hasHitLimit={hasHitLimit}/>
        </div>
    )
}