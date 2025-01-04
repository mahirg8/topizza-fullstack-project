import Trash from "@/components/icons/Trash"
import Plus from "@/components/icons/Plus"
import ChevronDown from "@/components/icons/ChevronDown"
import ChevronUp from "@/components/icons/ChevronUp"
import { useState } from "react"

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        })
    }

    function editProps(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProps(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">


            <button onClick={() => setIsOpen(prev => !prev)} className="inline-flex p-1 border-0 justify-start" type="button">
                {isOpen && (
                    <ChevronUp />
                )}
                {!isOpen && (
                    <ChevronDown />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.map((size, index) => (
                    <div className="flex items-end gap-2" key={index}>
                        <div>
                            <label>Size</label>
                            <input
                                type="text"
                                placeholder="Size"
                                value={size.name}
                                onChange={(ev) => editProps(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra Price</label>
                            <input
                                type="text" // Use type "number" for price
                                placeholder="Extra Price"
                                value={size.price}
                                onChange={(ev) => editProps(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => removeProps(index)}
                                className="bg-white mb-2 px-2"
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProps}
                    className="bg-white items-center"
                >
                    <Plus className="w-4 h-4" />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>


    )
}