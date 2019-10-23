const { Schema, model } = require('mongoose')

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [30, 'Minimal 30 words']
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answerId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    votes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        voteType: Number
      }
    ],
    tags: [
      {
        type: String,
        required: [true, 'Tags is required']
      }
    ]
  },
  { versionKey: false, timestamps: true }
)

const Question = model('Question', questionSchema)

module.exports = Question
