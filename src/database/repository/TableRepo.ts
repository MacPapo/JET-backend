import Table, { TableModel } from '../model/Table';
import { Types } from 'mongoose';

async function create(table: Table): Promise<Table> {
    const createdTable = await TableModel.create(table);
    return createdTable.toObject();
}

// TODO: fix Duplicate Key error
async function update(table: Table): Promise<Table | null> {
    return TableModel.findByIdAndUpdate(table._id, table, { new: true })
        .lean()
        .exec();
}

async function hasSameNumber(number: number): Promise<Boolean> {
    return await findTableIfExists(number) != null ? true : false;
}

async function findTableIfExists(number: number): Promise<Table | null> {
    return TableModel.findOne({ number: number })
        .lean()
        .exec();
}

async function findTableById(id: Types.ObjectId): Promise<Table | null> {
    return TableModel.findOne({ id: id })
        .lean()
        .exec();
}

async function deleteTable(id: Types.ObjectId): Promise<Table | null> {
    return TableModel.findByIdAndDelete(id)
        .lean()
        .exec();
}

async function findAll(): Promise<Table[]> {
    return TableModel.find()
        .lean()
        .exec();
}

export default {
    create,
    update,
    hasSameNumber,
    findTableIfExists,
    findTableById,
    findAll,
    deleteTable
};
