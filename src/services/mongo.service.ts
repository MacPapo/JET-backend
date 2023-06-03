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

}

export default MongoQueryService;
