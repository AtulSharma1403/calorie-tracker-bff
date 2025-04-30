const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    ACTIVITY: {
        type: String,
        required: true
    },
    SPECIFIC_MOTION: {
        type: String,
        required: true
    },
    METs: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const userActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activityName: {
        type: String,
        required: true
    },
    activityDescription: {
        type: String,
        required: false
    },
    metValue: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration must be at least 1 minute']
    },
    calorie: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = {
    Activity: mongoose.model('activitymasterdata', activitySchema),
    UserActivity: mongoose.model('useractivitydata', userActivitySchema)
}; 