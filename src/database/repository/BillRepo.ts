import Bill, { BillModel } from '../model/Bill';
import { Types } from 'mongoose';

async function create(bill: Bill): Promise<Bill> {
    const billCreated = await BillModel.create(bill);
    return billCreated.toObject();
}

async function update(bill: Bill): Promise<Bill | null> {
    return BillModel.findByIdAndUpdate(bill._id, bill, { new: true })
        .lean()
        .exec();
}

async function findById(id: string): Promise<Bill | null> {
    return BillModel.findById(id)
        .lean()
        .exec();
}

async function findByTable(number: number): Promise<Bill | null> {
    return BillModel.findOne({ table: number })
        .lean()
        .exec();
}

async function deleteBill(id: Types.ObjectId): Promise<Bill | null> {
    return BillModel.findByIdAndDelete(id)
        .lean()
        .exec();
}

async function findAll(): Promise<Bill[]> {
    return BillModel.find()
        .lean()
        .exec();
}

export default {
    create,
    update,
    findById,
    findByTable,
    deleteBill,
    findAll,
};
