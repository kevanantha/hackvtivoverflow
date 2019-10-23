const Question = require('../models/Question')

module.exports = {
  async findAll(req, res, next) {
    try {
      const questions = await Question.find()
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
      const question = await Question.findById(req.params.questionId)
      if (Object.keys(question).length) {
        if (question.votes.length) {
          const findVote = question.votes.find(q => q.userId == req.user.id)
          if (Object.keys(findVote).length) {
            if (findVote.voteType == 1) {
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
            } else if (findVote.voteType == -1) {
              await Question.updateOne(
                {
                  _id: req.params.questionId
                },
                {
                  $push: {
                    votes: {
                      userId: req.user.id,
                      voteType: 1
                    }
                  }
                }
              )
              res.status(200).json({ message: 'updated, from downvote' })
            }
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
        if (question.votes.length) {
          const findVote = question.votes.find(q => q.userId == req.user.id)
          if (Object.keys(findVote).length) {
            if (findVote.voteType == -1) {
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
            } else if (findVote.voteType == 1) {
              await Question.updateOne(
                {
                  _id: req.params.questionId
                },
                {
                  $push: {
                    votes: {
                      userId: req.user.id,
                      voteType: -1
                    }
                  }
                }
              )
              res.status(200).json({ message: 'updated, from upvote' })
            }
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
          res.status(200).json({ message: 'updated, new down vote' })
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
  async delete(req, res, next) {
    try {
      await Question.deleteOne({
        _id: req.params.questionId
      })
      res.status(204).json()
    } catch (err) {
      next(err)
    }
  }
}
