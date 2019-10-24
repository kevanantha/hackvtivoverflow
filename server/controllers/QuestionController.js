const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
  async findAll(req, res, next) {
    try {
      const questions = await Question.find().sort([['createdAt', -1]])
      res.status(200).json(questions)
    } catch (err) {
      next(err)
    }
  },
  async findOne(req, res, next) {
    try {
      const question = await Question.findOne({
        _id: req.params.questionId
      })
        .populate('userId')
        .populate('answerId')
      res.status(200).json(question)
    } catch (err) {
      next(err)
    }
  },
  async create(req, res, next) {
    try {
      const { title, tags, description } = req.body
      const question = await Question.create({
        title,
        description,
        tags,
        userId: req.user.id
      })
      res.status(201).json(question)
    } catch (err) {
      next(err)
    }
  },
  async upvote(req, res, next) {
    try {
      console.log('*******************')
      console.log(req.user)
      const question = await Question.findById(req.params.questionId)
      if (Object.keys(question).length) {
        const filterVote = question.votes.filter(q => q.userId == req.user.id)
        if (filterVote.length) {
          console.log(filterVote)
          if (filterVote[0].voteType == 1) {
            await Question.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            res.status(200).json({ message: 'updated, from upvote' })
          } else if (filterVote[0].voteType == -1) {
            await Question.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            await Question.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $push: {
                  votes: { userId: req.user.id, voteType: 1 }
                }
              }
            )
            res.status(200).json({ message: 'updated, from downvote' })
          }
        } else {
          await Question.updateOne(
            {
              _id: req.params.questionId
            },
            {
              $push: {
                votes: { userId: req.user.id, voteType: 1 }
              }
            }
          )
          res.status(200).json({ message: 'updated, new up vote' })
        }
      } else {
        const err = new Error('404 Not Found')
        err.name = 'NotFound'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  },
  async downvote(req, res, next) {
    try {
      const question = await Question.findById(req.params.questionId)
      if (Object.keys(question).length) {
        const filterVote = question.votes.filter(q => q.userId == req.user.id)
        if (filterVote.length) {
          console.log(filterVote)
          if (filterVote[0].voteType == -1) {
            await Question.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            res.status(200).json({ message: 'updated, from downvote' })
          } else if (filterVote[0].voteType == 1) {
            await Question.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            await Question.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $push: {
                  votes: { userId: req.user.id, voteType: -1 }
                }
              }
            )
            res.status(200).json({ message: 'updated, from upvote' })
          }
        } else {
          await Question.updateOne(
            {
              _id: req.params.questionId
            },
            {
              $push: {
                votes: { userId: req.user.id, voteType: -1 }
              }
            }
          )
          res.status(200).json({ message: 'updated, new downvote' })
        }
      } else {
        const err = new Error('404 Not Found')
        err.name = 'NotFound'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  },
  async answerSubmit(req, res, next) {
    try {
      console.log(req.body)
      const answerId = await Answer.create({
        body: req.body.body,
        question: req.body.questionId,
        userId: req.user.id
      })

      const updateQuestion = await Question.updateOne(
        {
          _id: req.params.questionId
        },
        {
          $push: {
            answerId: answerId._id
          }
        }
      )
      res.status(201).json({ updateQuestion })
    } catch (err) {
      next(err)
    }
  },
  async myQuestions(req, res, next) {
    try {
      const questions = await Question.find({
        userId: req.params.userId
      })
      res.status(200).json(questions)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      console.log(req.body)
      const updated = await Question.updateOne(
        {
          _id: req.params.questionId
        },
        {
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags
        }
      )
      console.log(updated)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    try {
      await Question.deleteOne({
        _id: req.params.questionId
      })
      await Answer.deleteOne({
        question: req.params.questionId
      })
      res.status(204).json()
    } catch (err) {
      next(err)
    }
  }
}
