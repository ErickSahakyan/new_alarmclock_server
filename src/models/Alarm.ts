import mongoose, { Document, Schema } from 'mongoose';

export interface IAlarm {
    time: string;
    text: string;
    condition: boolean;
    // weekday: [
    //     {
    //         id: string;
    //         condition: boolean;
    //         day: string;
    //     }
    // ];
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
        }
        // weekday: [
        //     {
        //         id: Number,
        //         day: String,
        //         condition: Boolean
        //     }
        // ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAlarmModel>('Alarm', AlarmSchema);
