import mongooseService from "../common/services/mongoose.service";

import WaiterSchema from "../models/waiter.model";
import BartenderSchema from "../models/bartender.model";
import CashierSchema from "../models/cashier.model";
import CookerSchema from "../models/cooker.model";

import { Waiter } from "../models/interfaces/waiter.interface";
import { Bartender } from "../models/interfaces/bartender.interface";
import { Cashier } from "../models/interfaces/cashier.interface";
import { Cooker } from "../models/interfaces/cooker.interface";

const db = mongooseService.getMongoose();

class MongoQueryService {

    public static async findUserByEmail(email: string) {
        let user = null;
        let category = null;

        const waiter = await WaiterSchema.findOne({ email });
        if (waiter) {
            user = waiter;
            category = 'Waiter';
        }

        const bartender = await BartenderSchema.findOne({ email });
        if (bartender) {
            user = bartender;
            category = 'Bartender';
        }

        const cashier = await CashierSchema.findOne({ email });
        if (cashier) {
            user = cashier;
            category = 'Cashier';
        }

        const cooker = await CookerSchema.findOne({ email });
        if (cooker) {
            user = cooker;
            category = 'Cooker';
        }

        return { user, category };
    }

    public static async isEmailActive(email: string) {

        const waiter    = await WaiterSchema.findOne({ email });
        const bartender = await BartenderSchema.findOne({ email });
        const cashier   = await CashierSchema.findOne({ email });
        const cooker    = await CookerSchema.findOne({ email });
        
        if (waiter    ||
            bartender ||
            cashier   ||
            cooker)
            return true;
        return false;
    }

    public static async registerUser(user: {
        firstName: string;
        lastName:  string;
        email:     string;
        password:  string;
        category:  string;
    }): Promise<Boolean> {

        let res: Boolean = false;
        switch (user.category) {
            case 'Waiter': {
                const waiter = new WaiterSchema({
                    firstName: user.firstName,
                    lastName:  user.lastName,
                    email:     user.email,
                    password:  user.password,
                });

                await waiter.save()
                    .then((waiter: Waiter) => {
                        res = true;
                    })
                    .catch((err: Error) => {
                        console.log(err.message);
                    });
                break;
            }
                
            case 'Bartender': {
                const bartender = new BartenderSchema({
                    firstName: user.firstName,
                    lastName:  user.lastName,
                    email:     user.email,
                    password:  user.password,
                });
                
                await bartender.save()
                    .then((bartender: Bartender) => {
                        res = true;
                    })
                    .catch((err: Error) => {
                        console.log(err.message);
                    });
                break;
            }
                
            case 'Cashier': {
                const cashier = new CashierSchema({
                    firstName: user.firstName,
                    lastName:  user.lastName,
                    email:     user.email,
                    password:  user.password,
                    // TODO: add Admin 
                });
                
                await cashier.save()
                    .then((cashier: Cashier) => {
                        res = true;
                    })
                    .catch((err: Error) => {
                        console.log(err.message);
                    });
                break;
            }
                
            case 'Cooker': {
                const cooker = new CookerSchema({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                
                await cooker.save()
                    .then((cooker: Cooker) => {
                        res = true;
                    })
                    .catch((err: Error) => {
                        console.log(err.message);
                    });
                break;
            }
                
            default: {
                // Handle default case or error condition
                res = true;
                break;
            }
        }
        return res;
    }
}

export default MongoQueryService;
