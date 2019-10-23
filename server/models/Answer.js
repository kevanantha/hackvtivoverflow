const { Schema, model } = require('mongoose')

const answerSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Body is required']
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    votes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        voteType: Number
      }
    ]
  },
  { versionKey: false, timestamps: true }
)
