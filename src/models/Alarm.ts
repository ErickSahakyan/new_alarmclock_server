import mongoose, { Document, Schema } from 'mongoose';


interface IWeekday {
    id: number,
    condition: boolean,
    weekdayName: string
}


export interface IAlarm {
    time: string;
    text: string;
    condition: boolean;
    weekday: IWeekday[]
}

export interface IAlarmModel extends IAlarm, Document {}

const AlarmSchema: Schema = new Schema(
    {
        time: {
            type: String,
            required: true,
            unique: true
        },
        text: {
            type: String,
            required: true
        },
        condition: {
            type: Boolean
        },
        weekday: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAlarmModel>('Alarm', AlarmSchema);
