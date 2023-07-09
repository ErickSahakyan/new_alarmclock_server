import mongoose, { Document, Schema } from 'mongoose';

interface IWeekday {
    id: number,
    condition: boolean,
    weekdayName: string
}
interface IAlarms {
    _id: string,
    time: string,
    text: string,
    condition: boolean,
    weekday: IWeekday[]
}
export interface IUser {
    email: string;
    password: string;
    alarms: IAlarms[]
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        alarms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Alarm'
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
