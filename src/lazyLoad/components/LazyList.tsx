

/**
 * @function LazyList will take a list of strings and map them to items on screen
 * @param items is the array of items to map
 * @param isLoading is if the next set of items are loading or not
 * @param hasHitLimit is if the list has reached the end of loading
 * @returns LazyList component
 */
export default function LazyList({ items, isLoading, hasHitLimit } : { items: string[], isLoading: boolean, hasHitLimit: boolean }) {

    return (
        <div>
            {items.map((item, index) => (
                <div>{index}. {item}</div>
            ))}
            <h1>{isLoading ? "Loading..." : "" }</h1>
            <h1>{hasHitLimit ? "Item limit reached!" : "" }</h1>
        </div>
    )
}