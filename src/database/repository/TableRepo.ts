import Table, { TableModel } from '../model/Table';
import { Types } from 'mongoose';

async function create(table: Table): Promise<Table> {
    const createdTable = await TableModel.create(table);
    return createdTable.toObject();
}

async function findTableIfExists(number: number): Promise<Table | null> {
    return TableModel.findOne({ number: number }).lean().exec();
}

async function findTableById(id: Types.ObjectId): Promise<Table | null> {
    return TableModel.findOne({ id: id }).lean().exec();
}

async function deleteTable(id: Types.ObjectId): Promise<Table | null> {
    return TableModel.findByIdAndDelete(id).lean().exec();
}

export default {
    create,
    findTableIfExists,
    findTableById,
    deleteTable
};
