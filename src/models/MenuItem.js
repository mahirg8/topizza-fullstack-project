import { model, models, Schema } from "mongoose";
import mongoose from "mongoose";

const ExtraPricesSchema = new Schema({
    name: String,
    price: Number,
})

const MenuItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    basePrice: {type: Number},
    sizes: {type: [ExtraPricesSchema]},
    extraIngredientPrices: {type: [ExtraPricesSchema]},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);