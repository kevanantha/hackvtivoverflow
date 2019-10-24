const Answer = require('../models/Answer')

module.exports = {
  async findAll(req, res, next) {
    try {
      const answers = await Answer.find()
      res.status(200).json(answers)
    } catch (err) {
      next(err)
    }
  },
  async findOne(req, res, next) {
    try {
      const answer = await Answer.findOne({
        _id: req.params.answerId
      })
      res.status(200).json(answer)
    } catch (err) {
      next(err)
    }
  },
  async upvote(req, res, next) {
    try {
      const answer = await Answer.findById(req.params.answerId)
      console.log(answer)
      console.log(req.params)
      if (Object.keys(answer).length) {
        const filterVote = answer.votes.filter(q => q.userId == req.user.id)
        if (filterVote.length) {
          console.log(filterVote)
          if (filterVote[0].voteType == 1) {
            await Answer.updateOne(
              {
                _id: req.params.answerId
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
            await Answer.updateOne(
              {
                _id: req.params.answerId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            await Answer.updateOne(
              {
                _id: req.params.answerId
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
          await Answer.updateOne(
            {
              _id: req.params.answerId
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
      const answer = await Answer.findById(req.params.answerId)
      if (Object.keys(answer).length) {
        const filterVote = answer.votes.filter(q => q.userId == req.user.id)
        if (filterVote.length) {
          console.log(filterVote)
          if (filterVote[0].voteType == -1) {
            await Answer.updateOne(
              {
                _id: req.params.answerId
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
            await Answer.updateOne(
              {
                _id: req.params.answerId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            await Answer.updateOne(
              {
                _id: req.params.answerId
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
          await Answer.updateOne(
            {
              _id: req.params.answerId
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
  async myAnswers(req, res, next) {
    try {
      const answers = await Answer.find({
        userId: req.params.userId
      }).populate('question')
      res.status(200).json(answers)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      const updated = await Answer.findOneAndUpdate(
        {
          _id: req.params.answerId
        },
        {
          $set: {
            body: req.body.body
          }
        }
      )
      console.log(req.params)
      console.log(req.body)
      // console.log(updated)
      res.status(200).json()
    } catch (err) {
      next(err)
    }
  }
}
