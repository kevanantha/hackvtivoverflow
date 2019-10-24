const { Schema, model } = require('mongoose')

const answerSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Body is required']
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
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

const Answer = model('Answer', answerSchema)

module.exports = Answer
