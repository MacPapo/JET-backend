import mongooseService from "../common/services/mongoose.service";
import Waiter from "../models/waiter.model";
import Cashier from "../models/cashier.model";
import Bartender from "../models/bartender.model";
import Cooker from "../models/cooker.model";

const db = mongooseService.getMongoose();

class MongoQueryService {

    public static async findUserByEmail(email: string) {
        let user = null;
        let category = null;

        const waiter = await Waiter.findOne({ email });
        if (waiter) {
            user = waiter;
            category = 'Waiter';
            return { user, category };
        }

        const bartender = await Bartender.findOne({ email });
        if (bartender) {
            user = bartender;
            category = 'Bartender';
            return { user, category };
        }

        const cashier = await Cashier.findOne({ email });
        if (cashier) {
            user = cashier;
            category = 'Cashier';
            return { user, category };
        }

        const cooker = await Cooker.findOne({ email });
        if (cooker) {
            user = cooker;
            category = 'Cooker';
            return { user, category };
        }

        return { user, category };
    }

    public static async registerUser(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        category: string;
    }) {
        let registeredUser = null;

        console.log(user);

        switch (user.category) {
            case 'Waiter': {
                const waiter = new Waiter({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                const savedWaiter = await waiter.save()
                    .then((savedWaiter) => {
                        return savedWaiter;
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                break;
            }
            case 'Bartender': {
                const bartender = new Bartender({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                const savedBartender = await bartender.save()
                    .then((savedBartender) => {
                        return savedBartender;
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                break;
            }
            case 'Cashier': {
                const cashier = new Cashier({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                const savedCashier = await cashier.save()
                    .then((savedCashier) => {
                        return savedCashier;
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                break;
            }
            case 'Cooker': {
                const cooker = new Cooker({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                const savedCooker = await cooker.save()
                    .then((savedCooker) => {
                        return savedCooker;
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                break;
            }
            default: {
                // Handle default case or error condition
                break;
            }
        }

        return registeredUser;
    }
}

export default MongoQueryService;
